AFRAME.registerComponent("menu", {
    schema: {
      state: { type: "string", default: "menu-list" },
      selectedCard: { type: "string", default: "#card1" },
      zoomAspectRatio: { type: "number", default: 1 }
    },
    init: function () {
      this.menuContainer = this.el;
      this.createCards()
    },
    tick: function() {
      const { state } = this.el.getAttribute("menu");
  
      if (state === "view") {
        this.hideEl([this.menuContainer]);
        this.showView();
      }
    },
    hideEl: function(elList) {
      elList.map(el => {
        el.setAttribute("visible", false);
      });
    },
    showView: function() {
      const { selectedCard } = this.data;
      if(selectedCard=="diet"){
        this.dietScreen()
      }
      if(selectedCard=="fitness"){
        this.fitnessScreen()
      }
      if(selectedCard=="sleep"){
        this.sleepScreen()
      }
    },
    dietScreen: function(){
        const skyEl = document.querySelector("#main-container")
        const scene = document.querySelector("#main-scene")
        const displayText = document.createElement("a-entity")
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane`);
        mainPlane.setAttribute("position", { x: -1, y: 1.5, z: -2 });
        mainPlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.7);
        mainPlane.setAttribute("height", 1.5);
        mainPlane.setAttribute("visible", true);
        scene.appendChild(mainPlane)
        // skyEl.setAttribute("material", {
        //   color: "white",
        // })  
        displayText.setAttribute("id", `text`);
        displayText.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
        displayText.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        displayText.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 2,
          align: "left",
          value: `Text Here \n Text Here`
        });
        mainPlane.appendChild(displayText);
    },
    fitnessScreen: function(){
      const skyEl = document.querySelector("#main-container")
      skyEl.setAttribute("material", {
        color: "blue",
      })  
  },
  sleepScreen: function(){
    const skyEl = document.querySelector("#main-container")
    skyEl.setAttribute("material", {
      color: "pink",
    })  
},
    createCards: function () {
      const thumbNailsRef = [
        {
          id: "diet",
          title: "My Diet",
          url: "./assets/thumbnails/diet.jpg",
        },
        {
          id: "fitness",
          title: "My Fitness",
          url: "./assets/thumbnails/fitness.jpg",
        },
  
        {
          id: "sleep",
          title: "My Sleep",
          url: "./assets/thumbnails/sleep.jpg",
        },
      ];
      let prevoiusXPosition = -60;
  
      for (var item of thumbNailsRef) {
        const posX = prevoiusXPosition + 25;
        const posY = 10;
        const posZ = -40;
        const position = { x: posX, y: posY, z: posZ };
        prevoiusXPosition = posX;
  
        // Border Element
        const borderEl = this.createBorder(position, item.id)
        // Thumbnail Element
        const thumbnail = this.createThumbnail(item)
        borderEl.appendChild(thumbnail)
        // Title Text Element
        const title = this.createTitle(position, item)
        borderEl.appendChild(title)
  
        this.menuContainer.appendChild(borderEl);
      }
    },
    createBorder: function(position, id){
      const entityEl = document.createElement("a-entity")
      entityEl.setAttribute("id", id)
      entityEl.setAttribute("position", position)
      entityEl.setAttribute("visible", true)
      entityEl.setAttribute("geometry", {primitive: "plane", width:22, height:30})
      entityEl.setAttribute("material", {color:"#0077CC", opacity:1})
  
      entityEl.setAttribute("cursor-listener", {});
  
      return entityEl
    },
    createThumbnail: function(item){
      const entityEl = document.createElement("a-entity")
      entityEl.setAttribute("visible", true)
      entityEl.setAttribute("geometry", {primitive: "plane", width:20, height:28})
      entityEl.setAttribute("material", {src: item.url})
      entityEl.setAttribute("position", {x:0, y:0, z:0.1})
      return entityEl
    },
    createTitle: function(position, item){
      const entityEl = document.createElement("a-entity")
      entityEl.setAttribute("text", {font:"exo2bold", align:"center", width:70, color:"black", value: item.title})
      const positionEl = position
      positionEl.y = -30
      entityEl.setAttribute("position", positionEl)
      entityEl.setAttribute("visible", true)
      return entityEl
    }
  });
  