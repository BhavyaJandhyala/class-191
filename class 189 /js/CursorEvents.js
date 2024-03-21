AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" },
    },
    init: function () {
      this.handleClickEvents();
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
    },
    handleClickEvents: function(){
      this.el.addEventListener("click", evt => {
        const menuContainer = document.querySelector("#menu-container")
        const {state} = menuContainer.getAttribute("menu")
        if (state === "menu-list") {
          const id = this.el.getAttribute("id");
          const menuId = [
            "diet",
            "fitness",
            "sleep"
          ];
          if (menuId.includes(id)) {
            menuContainer.setAttribute("menu", {
              state: "view",
              selectedCard: id
            });
          }
        }
        if(state=="view"){
          this.handleViewState()
        }
      })
    },
    handleViewState: function () {
      const el = this.el
      const id = el.getAttribute("id")
      const menuContainer = document.querySelector("#menu-container")
      const { selectedItemId } = menuContainer.getAttribute("cursor-listener")
      menuContainer.setAttribute("menu", { state: "view" })
      if(id=="diet"){
        const skyEl = document.querySelector("#main-container")
        skyEl.setAttribute("material", {
          color: "white",
        })
        menuContainer.setAttribute("visibile", false)
      }
    },
    handleMenuListState: function () {
      const id = this.el.getAttribute("id");
      const menuId = ["diet", "fitness", "sleep"];
      if (menuId.includes(id)) {
        const menuContainer = document.querySelector("#menu-container");
        menuContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("material", {
          color: "blue",
          opacity: 1,
        });
      }
    },
    handleMouseEnterEvents: function () {
      // Mouse Enter Events
      this.el.addEventListener("mouseenter", () => {
        this.handleMenuListState();
      });
    },
    handleMouseLeaveEvents: function () {
      // Mouse Leave Events
      this.el.addEventListener("mouseleave", ()=>{
        const {selectedItemId} = this.data
        if (selectedItemId) {
          const el = document.querySelector(`#${selectedItemId}`)
          const id = el.getAttribute("id")
          if (id == selectedItemId){
            el.setAttribute("material", {
              color: "#0077CC",
              opacity: 1,
            });
          }
  
        }
      })
    },
  });
  