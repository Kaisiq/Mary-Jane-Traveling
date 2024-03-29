let mouse = new THREE.Vector3();
mouse.z = 0.01;
let mouseRaycaster = new THREE.Vector2();
let intersects;
let districts = [],
  districtsTweens = [],
  tweenHasStarted = [],
  positionsOver = [],
  scratched = [],
  dots = [];
let oldCameraCoords = new THREE.Vector3();
const heightOverDistrict = 30;
let canScratch = false,
  cameraMoving = false;
let mapTextureMaterial;
const startAngle = 0,
  endAngle = 2 * Math.PI,
  radiusScratch = 2.5;

let mouseT = 0;
var mouseButton = 0;

// window.addEventListener('touchstart', onTouchStart, false);
// window.addEventListener('touchmove', onTouchMove, false);
// window.addEventListener('touchend', onMouseUp, false);
window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("mouseup", onMouseUp, false);
window.addEventListener("contextmenu", onContextMenu, false);

function onMouseDown(event) {
  mouseButton = event.which;
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}

function onMouseUp(event) {
  // const circleShape = new THREE.Shape();

  // const x = Math.random() * 50,
  //   y = Math.random() * 50;

  // circleShape.moveTo(x + radiusScratch, y);
  // circleShape.arc(x, y, radiusScratch, startAngle, endAngle, false);

  // const geometry = new THREE.ShapeGeometry(circleShape);
  // let circleAz = new THREE.Mesh(geometry, materialM);
  // circleAz.position.z = 0.01;
  // scene.add(circleAz);

  if (mouseButton == 1) {
    if (canScratch) return;

    if (intersects != null && intersects.length != 0) {
      var clickedObj = intersects[0].object;
      for (let i = 0; i < 28; i++) {
        if (clickedObj == districts[i]) {
          canScratch = true;
          cameraMoving = true;
          new TWEEN.Tween(camera.position)
            .to(positionsOver[i], 2000)
            .easing(TWEEN.Easing.Quartic.Out)
            .start();
        }
      }
    }
  } else if (mouseButton == 3) {
    if (camera.position.z < 80) {
      canScratch = false;
      new TWEEN.Tween(camera.position)
        .to(oldCameraCoords, 1500)
        .easing(TWEEN.Easing.Quartic.In)
        .start()
        .onComplete(() => {
          cameraMoving = false;
        });
    }
  }
  mouseButton = false;
}

function onHover(array) {
  let hasIntersected = false;
  for (var i = 0; i < 28; i++) {
    if (districts[i] == array[0].object) {
      // districts[i].position.z = 2
      if (!tweenHasStarted[i]) {
        districtsTweens[i].start();
        tweenHasStarted[i] = true;
      }

      hasIntersected = true;
    }
  }
}

function onMouseMove(event) {
  // // if (isTouchSuported) return;
  mouseRaycaster.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouseRaycaster.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // if (!mouseButton) return; // if no button is pressed

  // mouseT += 1;
  // var dX = event.clientX - mouse.x;
  // var dY = event.clientY - mouse.y;

  // // left button
  // if (mouseButton == 1) {
  //   calculateRotationAngles(dX, dY);
  //   canvas.style.cursor = "grabbing";
  // }

  mouse.x = event.clientX;
  mouse.y = event.clientY;
}

function onContextMenu(event) {
  event.preventDefault();
}
