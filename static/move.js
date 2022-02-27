"use strict";
(function() {
  window.addEventListener('load', init);

  /**
   * this function will call a function to load the list of books
   * when the page loads
   */
  function init() {
    toggleHomeView();
    enableOnScreenButtons();
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


  function enableOnScreenButtons() {
    let navbarLinks = qsa("#menu-items li");
    console.log(navbarLinks);
    for (let i = 0; i < navbarLinks.length; i++) {
      navbarLinks[i].addEventListener('click', (e) => toggleViewOn(e, navbarLinks));
    }
    id('moveio').addEventListener('click', toggleHomeView);
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
    let pages = qsa(".pages")
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.add("hidden");
    }
  }

})();
