"use strict";
(function() {
  window.addEventListener('load', init);

  /**
   * this function will call a function to load the list of books
   * when the page loads
   */
  function init() {
    toggleHomeView();
    loadPages();
    enableOnScreenButtons();
  }

  function enableOnScreenButtons() {
    let navbarLinks = qsa("#menu-items li");
    for (let i = 0; i < navbarLinks.length; i++) {
      navbarLinks[i].addEventListener('click', (e) => toggleViewOn(e, navbarLinks));
    }
    id('moveio').addEventListener('click', toggleHomeView);
    id('challenge_btn').addEventListener('click', loadChallenge);
  }

  function loadPages() {
    loadClasses();
    loadChallenge();
  }

  function toggleViewOn(e, navbarLinks) {
    let thisid = e.currentTarget.textContent.toLowerCase();
    let pages = qsa(".pages");
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.add("hidden");
    }
    var element = id(thisid);
    element.classList.remove("hidden");
  }

  function toggleHomeView() {
    let pages = qsa(".pages");
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.add("hidden");
    }
    var home = id('hero');
    home.classList.remove("hidden");
  }

  function loadClasses() {
    for (let i = 0; i < exercises.length; i++) {
      console.log(exercises[i]);
      let exs = exercises[i];
      let name = exs.name;
      let desc = exs.desc;
      let pic = exs.picture;
      let vid = exs.video;
      
      let card = gen('div');
      card.classList.add("card");
      let img = gen('img');
      let cardId = name;
      img.src = pic;
      img.alt = 'This exercise is ' + cardId;
      let title = gen('p');
      title.classList.add("card-header");
      title.textContent = name;
      card.id = cardId;
      card.appendChild(img);
      card.appendChild(title);
      id('classes').appendChild(card);
    }
  }

  function loadChallenge() {
    let img = id("challenge_window");
    img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAbFBMVEX////Q0NDMzMzp6enR0dGcnJwAAACgoKD29vbx8fHKysr7+/vs7Ozb29u2trbv7+/Y2Njh4eFubm5EREQ1NTVpaWktLS1lZWW/v79zc3N6enpOTk48PDytra2SkpKHh4dcXFxKSkogICANDQ0sfVPvAAADF0lEQVR4nO3ZiXLaMBCAYdsSxQIMFmBMIJDr/d+xK1kYpjidhGnHUvt/CTlIMqNltasjWQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf5fa79XYY/gjlpPJshx7EH/AYjqZTBbhGzMfdSyPsJXtBq0kkGmYW6fzKbXcLIq8sP4rdc3Isl0/zcYc1QMkkDz3r/41I3bdrJ/2447r+/QlJbYP5Nw07WHx+z+Lj3IpcaMOU2ue5U3btMuxx/V9tURSZzdT66Vtmpf0ula2kkAKdQ1kL3Gs9dij+gZzabBWqkSXl0DUoV23k/AjXazGGt6X2UrbLhQlccxsGQKZttKzQkM+bI5nE/uCot2MCgOWctflXJWlzRaSkObkn51sdtvnYz3qKL/A1XhR+H4lQdm+uNW0Obj5dDrudtvt82v0+0jjUuIeMndW5vYnusiyYr1zceyOKSzwtgtF27tWaw8bF8Vuc44+Hx3rA8nv6jnf7iSM7SH6+ugZVykDm5GphPGa1m5LOtbAs+a4mZossdXdDj25vC+cVJmV8cq4F0Q5F1adwYRk5m0TvK3ziEOp/GooeyzZnQzOocX7j17Ma2LtIpi5OPJPWuzzJYyPjzcbb0oqWQtnwWBGzEefkPdzvHEIV8Yr496Gu+yyV/wz/SsR9WDbcs1s3r2nkRBTz4a6q5FekNQ1ij+UDOxRfHuOuFn9wu/jh157E5rzIolQXBiFPCpzXwZGh1CG1/2oSHH4wbpjra5uq7qq5IOqu2x1RR8zt6iHyaPqm1kkierugJT/DV1GHodkRCZON3r/4ksIovR3waH8fSjRl8nK2nDEVTLJcpNlsonMZdPujr9hm6isiv5a64afQvJZu9st33o/2RJHzl4GrrtreeVvJMYe1QP6qVR3GfFTTSc0owLVVXrmA+luVNyJqxp1UA+QpS8vuqXdnVF8Itz/FdPaamW+Qi6HxD4Q348jPt8Oku1vEc5Wui8NWSHrlPquZ/o5dM2IJGpgA5aMOv/sJiIxql/RU5fUfgQAAAAAAAAAAAAAAAAAAAAAAAAAAAD43/wEfmYcGzg+iAIAAAAASUVORK5CYII=";
    setTimeout(() => {img.src="/video_feed"}, 50)
  }
  













/**
   * shortcut function to select object using ID and make object
   * @param {String} idName - id of wlement we want to select
   * @returns {Object} Returns object that was identified by ID
   */
 function id(idName) {
  return document.getElementById(idName);
}

/**
 * shortcut function to select object using selector and make object
 * @param {String} selector - identifier of element we want to select
 * @returns {Object} Returns object that was identified by selctor
 */
function qs(selector) {
  return document.querySelector(selector);
}

/**
 * shortcut function to create node list of objects using identifiers
 * @param {String} selector - identifier of element we want to create list of
 * @returns {Object} Returns node list that was identified by selector
 */
function qsa(selector) {
  return document.querySelectorAll(selector);
}

/**
 * shortcut function to create object using element type
 * @param {String} elType - element of what we want to create
 * @returns {Object} Returns object that was created by element specified
 */
function gen(elType) {
  return document.createElement(elType);
}
  

  const pushupJs = {
    "name": "pushup",
    "desc": "A conditioning exercise performed in a prone position by raising and lowering the body with the straightening and bending of the arms while keeping the back straight and supporting the body on the hands and toes",
    "picture": "https://media.istockphoto.com/photos/beautiful-young-sports-lady-doing-push-ups-while-workout-at-home-picture-id1254996126?k=20&m=1254996126&s=612x612&w=0&h=rsKgWYDbSHmyNJ5h40FNtsMVOV-J9AWp8YzuTt-Y2X8=",
    "video": "pushup.gif",
    "ins": ["1. Contract your abs and tighten your core by pulling your belly button toward your spine.", 
          "2. Inhale as you slowly bend your elbows and lower yourself to the floor, until your elbows are at a 90-degree angle.", 
          "3. Exhale while contracting your chest muscles and pushing back up through your hands, returning to the start position."
        ]
  }

  const squatJs = {
    "name": "squat",
    "desc": "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up.",
    "picture": "https://experiencelife.lifetime.life/wp-content/uploads/2021/03/Pull-Ups-1280x720.jpg",
    "video": "pullup.gif",
    "ins": ["1. Stand up with your feet shoulder-width apart.",
          "2. Bend your knees, press your hips back and stop the movement once the hip joint is slightly lower than the knees.",
          "3. Press your heels into the floor to return to the initial position."
        ]
  }

  const yogaJs = {
    "name": "yoga",
    "desc": "Various styles of yoga combine physical postures, breathing techniques, and meditation or relaxation",
    "picture": "https://www.goodnet.org/photos/281x197/34271_hd.jpg",
    "video":"yoga.gif",
    "ins": ["1. Stand up with your feet, a little wider than shoulder width.",
            "2. Lift arms from your shoulder until they are parallel to the ground",
            "3. Hold for 10 seconds."
          ]
  }

  const exercises = [pushupJs, squatJs, yogaJs]

})();
