init();

let vertices, mesh, circle, scene2, material;

let sizes = [];
const center = new THREE.Vector2(25.4858, 42.7339);

loadDistricts("./export_all.geojson");

positionsOver = [
  new THREE.Vector3(14, -40, heightOverDistrict), //vidin
  new THREE.Vector3(122, -17, heightOverDistrict),
  new THREE.Vector3(135, 5, heightOverDistrict), //varna
  new THREE.Vector3(85, 5, heightOverDistrict), //vt
  new THREE.Vector3(-10, 25, heightOverDistrict), //vidin
  new THREE.Vector3(25, 15, heightOverDistrict), //vraca
  new THREE.Vector3(70, -3, heightOverDistrict), //gabrovo
  new THREE.Vector3(150, 20, heightOverDistrict), //dobrich
  new THREE.Vector3(75, -40, heightOverDistrict), //kard...
  new THREE.Vector3(-5, -20, heightOverDistrict), //slavi
  new THREE.Vector3(40, 0, heightOverDistrict), //LOVECH
  new THREE.Vector3(10, 13, heightOverDistrict), //bosa
  new THREE.Vector3(35, -25, heightOverDistrict), //pazarjik
  new THREE.Vector3(-5, -15, heightOverDistrict), //pernik
  new THREE.Vector3(44, 12, heightOverDistrict), //pleven
  new THREE.Vector3(55, -23, heightOverDistrict), //plovdiv
  new THREE.Vector3(100, 15, heightOverDistrict), //razgrad
  new THREE.Vector3(90, 20, heightOverDistrict), //rusИ
  new THREE.Vector3(115, 25, heightOverDistrict), //silistra
  new THREE.Vector3(100, -10, heightOverDistrict), //sliven
  new THREE.Vector3(50, -40, heightOverDistrict), //smolqn
  new THREE.Vector3(20, -10, heightOverDistrict), //sf-obl
  new THREE.Vector3(20, -10, heightOverDistrict), //sf
  new THREE.Vector3(75, -20, heightOverDistrict), //stz
  new THREE.Vector3(100, 5, heightOverDistrict), //targovishte
  new THREE.Vector3(85, -35, heightOverDistrict), //haskovo
  new THREE.Vector3(115, 10, heightOverDistrict), //shumne
  new THREE.Vector3(110, -20, heightOverDistrict), //qm_mnogo
];

function loadDistricts(path) {
  fetch(path)
    .then((response) => response.json())
    .then((json) => {
      camera.position.set(
        (center.x - 23) * 30,
        (center.y - 43) * 30 /*-70*/,
        90
      );
      oldCameraCoords.copy(camera.position);
      // camera.rotation.x = Math.PI / 6;
      for (let j = 0; j < 28; j++) {
        tweenHasStarted[j] = false;
        // let material = new THREE.MeshBasicMaterial({
        //   color: new THREE.Color(
        //     Math.random(),
        //     Math.random(),
        //     Math.random()
        //   ),
        //   side: THREE.DoubleSide,
        // });

        let material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0xecc834),
        });

        const districtShape = new THREE.Shape();

        districtShape.moveTo(
          (json.features[j].geometry.coordinates[0][0][0] - 23) * 30,
          (json.features[j].geometry.coordinates[0][0][1] - 43) * 30
        );
        for (
          let i = 1;
          i < json.features[j].geometry.coordinates[0].length;
          i++
        ) {
          districtShape.lineTo(
            (json.features[j].geometry.coordinates[0][i][0] - 23) * 30,
            (json.features[j].geometry.coordinates[0][i][1] - 43) * 30
          );
        }

        const geometry = new THREE.ShapeGeometry(districtShape);
        mesh = new THREE.Mesh(geometry, material);

        const lineGeometry = new THREE.BufferGeometry();

        lineGeometry.setAttribute(
          "position",
          geometry.getAttribute("position")
        );

        // create a Three.js line object and add it to the scene
        const line = new THREE.Line(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color: 0x324e4a,
          })
        );
        mesh.add(line);

        let boundingBox = new THREE.Box3();
        mesh.geometry.computeBoundingBox();
        let districtSize = new THREE.Vector3();
        boundingBox
          .copy(mesh.geometry.boundingBox)
          .applyMatrix4(mesh.matrixWorld);
        boundingBox.getSize(districtSize);
        // console.log(districtSize);

        // (json.features[j].geometry.coordinates[0][0][0] - 23) * 30,
        //   (json.features[j].geometry.coordinates[0][0][1] - 43) * 30

        // positionsOver.push(new THREE.Vector3((json.features[j].geometry.coordinates[0][0][0] - 23) * 30-districtSize.x/2,(json.features[j].geometry.coordinates[0][0][1] - 43) * 30-  districtSize.y/2,heightOverDistrict))

        scene.add(mesh);

        districts.push(mesh);
        // sizes.push(districtSize);

        const box = new THREE.BoxHelper(
          mesh,
          new THREE.Color(Math.random(), Math.random(), Math.random())
        );
        // scene.add(box);
      }
      renderer.setAnimationLoop(frame);

      scene2 = new THREE.Scene();
      // scene2.add(districts[23]);
      const clearPass = new THREE.ClearPass();

      const clearMaskPass = new THREE.ClearMaskPass();

      // const maskPass1 = new THREE.MaskPass(scene, camera);
      const maskPass1 = new THREE.RenderPass(scene, camera);
      const maskPass2 = new THREE.MaskPass(scene2, camera);

      //1 - "./images/background.png"   черна земя
      //2 - "./images/01.png"
      //3 - "./images/ag-square.png"
      const texture1 = new THREE.TextureLoader().load("./images/01 - Copy.png");
      texture1.minFilter = THREE.LinearFilter;

      const texture2 = new THREE.TextureLoader().load(
        "./images/background.png"
      );

      const texturePass1 = new THREE.TexturePass(texture1);
      const texturePass2 = new THREE.TexturePass(texture2);
      const outputPass = new THREE.ShaderPass(THREE.CopyShader);

      composer.addPass(clearPass);
      composer.addPass(maskPass1);
      // composer.addPass(texturePass1);
      composer.addPass(clearMaskPass);
      composer.addPass(maskPass2);
      composer.addPass(texturePass2);
      composer.addPass(clearMaskPass);
      composer.addPass(outputPass);

      // scene2.add(new THREE.Mesh(new THREE.PlaneGeometry(50,50,50,50),new THREE.MeshStandardMaterial({color:'red',alphaMap:texture1,transparent:true})));
      loadDistrictsTweens();
    });
}

const raycaster = new THREE.Raycaster();
const hoverRaycaster = new THREE.Raycaster();
const hoverMouse = new THREE.Vector2(0, 0);
let hoverIntersects = null;

let geometry3 = new THREE.CircleGeometry(5, 16);
let material3 = new THREE.MeshBasicMaterial({
  color: "red",
  transparent: true,
  opacity: 0.5,
});
circle = new THREE.Mesh(geometry3);

function animate(t) {
  raycaster.setFromCamera(mouseRaycaster, camera);
  intersects = raycaster.intersectObjects(districts);

  if (intersects != null && intersects.length != 0 && !cameraMoving) {
    onHover(intersects);
  }

  for (let i = 0; i < 28; i++) {
    if (!intersects.find((intersect) => intersect.object === districts[i])) {
      districts[i].position.z = 0;
      tweenHasStarted[i] = false;
    }
  }

  // renderer.render(scene, camera);
  renderer.clear();
  circle = circle.clone();
  circle.position.set(100 * Math.random(), 100 * Math.random() - 50, 0);
  // scene2.add(circle);

  composer.render(t);

  TWEEN.update();
  // for(let i=0; i<28;i++)
  // {
  // districts[0].position.z = Math.sin(t) * 5;
  // }
  // camera.position.z-=0.01;
  // districts[0].rotation.set(0, t / 2, 0);
}

function loadDistrictsTweens() {
  for (let i = 0; i < 28; i++) {
    let tweeni = new TWEEN.Tween(districts[i].position)
      .to(
        new THREE.Vector3(districts[i].position.x, districts[i].position.y, 3),
        1000
      )
      .easing(TWEEN.Easing.Elastic.Out);
    districtsTweens.push(tweeni);
  }
}
