from flask import Flask, render_template, Response
import cv2
import mediapipe as mp
import time

app = Flask(__name__)

camera = cv2.VideoCapture(0)
mpHands = mp.solutions.hands


mp_drawing_styles = mp.solutions.drawing_styles
mp_holistic = mp.solutions.holistic
holistic =  mp_holistic.Holistic()
hands = mpHands.Hands()
mpDraw = mp.solutions.drawing_utils





@app.route("/")
def homepage():
    return render_template("page.html", title="HOME PAGE")

@app.route("/docs")
def docs():
    return render_template("page.html", title="docs page")

@app.route("/about")
def about():
    return render_template("page.html", title="about page")

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames2(), mimetype='multipart/x-mixed-replace; boundary=frame')

def generate_frames():

    pTime = 0
    cTime = 0
    while True:
        success, img = camera.read()  # read the camera frame
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = hands.process(imgRGB)
        print(results.multi_hand_landmarks)

        if results.multi_hand_landmarks:
          for handLms in results.multi_hand_landmarks:
            for id, lm in enumerate(handLms.landmark):
                # print(id, lm)
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                print(id, cx, cy)
                # if id == 4:
                cv2.circle(img, (cx, cy), 15, (255, 0, 255), cv2.FILLED)

            mpDraw.draw_landmarks(img, handLms, mpHands.HAND_CONNECTIONS)

        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime

        cv2.putText(img, str(int(fps)), (10, 70), cv2.FONT_HERSHEY_PLAIN, 3,
                    (255, 0, 255), 3)

        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', img)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result



def generate_frames2():
  cap = cv2.VideoCapture(0)
  i = 500
  with mp_holistic.Holistic(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as holistic:
    while True:
      success, img = cap.read()
      if not success:
          break
      else:
        results = holistic.process(img)
        if results.pose_landmarks:

          # To improve performance, optionally mark the image as not writeable to
          # pass by reference.
          img.flags.writeable = False
          img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
          if(i < 0):
            scale_percent = 200 # percent of original size
            width = int(img.shape[1] * scale_percent / 100)
            height = int(img.shape[0] * scale_percent / 100)
            dim = (width, height)
            # congrats = cv2.resize(grat, dim, interpolation = cv2.INTER_AREA)
            # img = congrats
          # print (results.pose_landmarks.landmark[16].y - results.pose_landmarks.landmark[15].y)
          elif (results.pose_landmarks.landmark[16].visibility < 0.8 or (results.pose_landmarks.landmark[15].visibility < 0.8 )):
            cv2.putText(img, f'Please put your arms in the frame!', (100, 100), cv2.FONT_HERSHEY_PLAIN, 3, (255, 255, 255), 3)
          else:
            val = (results.pose_landmarks.landmark[16].y - results.pose_landmarks.landmark[15].y);
            if val > 0.2:
              cv2.putText(img, f'Left too high!', (100, 100), cv2.FONT_HERSHEY_PLAIN, 3, (255, 0, 0), 3)
              i = 500
            elif val < -0.2:
              cv2.putText(img, f'Right too high!', (100, 100), cv2.FONT_HERSHEY_PLAIN, 3, (255, 0, 0), 3)
              i = 500
            else:
              cv2.putText(img, f'Good!! Hold for {round(i/50)} seconds', (100, 100), cv2.FONT_HERSHEY_PLAIN, 3, (0, 255, 0), 3)
              i -= 3;
          # if results.pose_landmarks.landmark[16] and results.pose_landlandmarks.landmark[15]:
          #   print (abs(results.pose_landmarks.landmark[16] - results.pose_landlandmarks.landmark[15]))
          # Draw landmark annotation on the image.
          img.flags.writeable = True
          img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
          mpDraw.draw_landmarks(
            img,
            results.face_landmarks,
            mp_holistic.FACEMESH_CONTOURS,
            landmark_drawing_spec=None,
            connection_drawing_spec=mp_drawing_styles
            .get_default_face_mesh_contours_style())
          mpDraw.draw_landmarks(
            img,
            results.pose_landmarks,
            mp_holistic.POSE_CONNECTIONS,
            landmark_drawing_spec=mp_drawing_styles
            .get_default_pose_landmarks_style())
          ret,buffer=cv2.imencode('.jpg',img)
          img=buffer.tobytes()
          yield(b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')
    # Flip the image horizontally for a selfie-view display.

if __name__ == "__main__":
    app.run(debug=True)
    # app.run(host='127.0.0.1', port=8080, debug=True)
