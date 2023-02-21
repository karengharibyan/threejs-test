//@ts-ignore
import {
  ReinhardToneMapping,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
  AnimationMixer,
  Clock,
  SphereGeometry,
  MeshNormalMaterial,
  Mesh,
  Color,
  MeshBasicMaterial,
  MathUtils,
  CameraHelper,
  ConeGeometry,
  PointLight,
  AmbientLight,
  LineSegments,
  LineBasicMaterial,
  BoxGeometry,
  MeshPhongMaterial,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { getRandomColor } from "../Helpers";

export class Animation {
  public camera?: PerspectiveCamera;
  public renderer?: WebGLRenderer;
  public scene = new Scene();
  public controls?: OrbitControls;
  public mixer?: AnimationMixer;
  private clock = new Clock();
  constructor() {
    this.initCamera();
    this.initRenderer();
    this.initOrbitControls();
    this.initLights();
    // this.scene.background =  new Color( 0xaaaaaa );
  }

  public initialize = () => {
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
    const root = document.getElementById("root");
    //@ts-ignore
    root?.append(this.renderer?.domElement);
    //@ts-ignore
    window.Animation = this;
  };

  private initRenderer() {
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = ReinhardToneMapping;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.toneMappingExposure = 1.3;
    this.renderer.setPixelRatio(window.innerWidth / window.innerHeight);
  }

  private initCamera() {
    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(0, 0, -500);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);
  }

  private initOrbitControls() {
    this.controls = new OrbitControls(
      this.camera as PerspectiveCamera,
      this.renderer?.domElement
    );
    this.controls.enableDamping = true;
    this.controls.target.set(0, 1, 0);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.controls?.update();
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }
    this.renderer?.render(
      this.scene as Scene,
      this.camera as PerspectiveCamera
    );
  };

  public render = () => {
    this.animate();
  };

  public addSphere = (scale: number) => {
    const color = getRandomColor();
    const geometry = new SphereGeometry(15, 32, 16);
    const material = new  MeshBasicMaterial({ color: color})
    const sphere = new Mesh(geometry, material);
    const xPos = MathUtils.randFloat(-200, 300);
    const yPos = MathUtils.randFloat(-200, 300);
    const zPos = MathUtils.randFloat(-200, 300);
    sphere.scale.set(scale, scale, scale);
    sphere.position.set(xPos, yPos, zPos);
    this.scene.add(sphere);
    return sphere;
  };

  public addPyramid = (scale: number) => {
    const color = getRandomColor();
    const geometry = new ConeGeometry(15, 32, 16);
    const material = new MeshBasicMaterial({ color: color });
    const cone = new Mesh(geometry, material);
    const xPos = MathUtils.randFloat(-200, 300);
    const yPos = MathUtils.randFloat(-200, 300);
    const zPos = MathUtils.randFloat(-200, 300);
    cone.scale.set(scale, scale, scale);
    cone.position.set(xPos, yPos, zPos);
    this.scene.add( cone );
    return cone
  };

  public addCube = (scale: number) => {
    const color = getRandomColor();
    const geometry = new BoxGeometry(15, 15, 15);
    const material = new MeshBasicMaterial( {color: color} );
    const cube = new Mesh( geometry, material );
    const xPos = MathUtils.randFloat(-200, 300);
    const yPos = MathUtils.randFloat(-200, 300);
    const zPos = MathUtils.randFloat(-200, 300);
    cube.scale.set(scale, scale, scale);
    cube.position.set(xPos, yPos, zPos);
    this.scene.add( cube );
    return cube
  }

  private initLights = () => {
    const light = new AmbientLight(0xFFFFFF);
    light.position.set(0,0,0)

    // this.scene.add(light);
  };
}

const InitAnimation = () => {
  let animation: Animation | null;
  return () => {
    if (!animation) {
      animation = new Animation();
    }
    return animation;
  };
};

export const getAnimation = InitAnimation();
