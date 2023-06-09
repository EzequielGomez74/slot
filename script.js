let slot_screen = document.getElementById("slot-screen");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let stop_btn = document.getElementsByClassName("stop-btn");
let start_btn = document.getElementById("start-btn");

let sec = 100;             // slot reel rotation speed (runs per sec)
let stopReelFlag = [];     // slot reel stop flag
let reelCounts = [];       // which image to position
let slotFrameHeight;       // frame size
let slotReelsHeight;       // overall reel image size
let slotReelItemHeight;
let slotReelStartHeight;

// Inicio
let slot = {
    init: function() {
      stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
      reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    },
  
    // Click event
    start: function() {
      slot.init();
      start_btn.setAttribute("disabled", true);
      for (let index = 0; index < 3; index++) {
        slot.animation(index);
      }
    },
  
    // Stop btn click
    stop: function(i) {
      stopReelFlag[i] = true;
      if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
        start_btn.removeAttribute("disabled");
      }
    },
  
    // Set primera posicion
    resetLocationInfo: function() {
      slotFrameHeight = slot_screen.offsetHeight;
      slotReelsHeight = reels[0].offsetHeight;
      slotReelItemHeight = reel[0].children[0].offsetHeight;
      slotReelStartHeight = slotReelsHeight;
      slotReelStartHeight += slotFrameHeight - slotFrameHeight / 2 + (slotReelItemHeight * 3) / 2;
      for (let i = 0; i < reels.length; i++) {
        reels[i].style.top = "-" + slotReelItemHeight * 2 + "px";
      }
    },
  
    // Movimiento del slot
    animation: function(index) {
      if (reelCounts[index] >= 6) {
        reelCounts[index] = 0;
      }
      $(reels[index]).animate(
        {
          top: "-" + slotReelItemHeight * (reelCounts[index] + 2) + "px"
        },
        {
          duration: sec,
          easing: "linear",
          complete: function() {
            if (stopReelFlag[index]) {
              return;
            }
            reelCounts[index]++;
            slot.animation(index);
          }
        }
      );
    }
  };
  
  window.onload = function() {
    slot.init();
    slot.resetLocationInfo();
    start_btn.addEventListener("click", function(e) {
      e.target.setAttribute("disabled", true);
      slot.start();
      for (let i = 0; i < stop_btn.length; i++) {
        stop_btn[i].removeAttribute("disabled");
      }
    });
  
    for (let i = 0; i < stop_btn.length; i++) {
      stop_btn[i].addEventListener("click", function(e) {
        slot.stop(e.target.getAttribute("data-val"));
      });
    }
  };