import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, {
  ChangeEventHandler,
  SelectHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { getAnimation } from "./Animation";
import "./App.scss";
import { GEOMETRIES } from "./Enums";

const Animation = getAnimation();

const geometries = [GEOMETRIES.CUBE, GEOMETRIES.SPHERE, GEOMETRIES.PYRAMID];

function App() {
  const [geometry, setGeometry] = useState<null | string>("");
  const [scale, setScale] = useState<null | string>("");
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    Animation.initialize();
    Animation.render();
  }, []);

  const onElementChange = (event: any) => {
    setGeometry(event.target.value);
    setScale("");
  };

  const onScaleChange = (event: any) => {
    setScale(event.target.value);
  };

  useEffect(() => {}, [geometry]);

  const addSphere = () => {
    const sphere =  Animation.addSphere(Number(scale));
    setElements([...elements,sphere])
  };

  const addCube = () => {
   const cube = Animation.addCube(Number(scale));
    setElements([...elements,cube])
  };

  const addPyramid = () => {
    const pyramid = Animation.addPyramid(Number(scale));
    setElements([...elements,pyramid])
  };

  const onCreateClick = () => {
    switch (geometry) {
      case GEOMETRIES.CUBE:
        addCube();
        break;
      case GEOMETRIES.PYRAMID:
        addPyramid();
        break;
      case GEOMETRIES.SPHERE:
        addSphere();
        break;

      default:
        return;
        break;
    }
  };

  const removeItem = (item: any) => {
    const new_elements = elements.filter((_item) => _item.id !== item.id)
    item.removeFromParent()
    setElements(new_elements)
  }

  return (
    <Container className="App">
      <div className="actions-block">
        <Grid container spacing={1}>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Geometry</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={geometry}
                label="Geometry"
                onChange={onElementChange}
              >
                {geometries.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              type="number"
              id="outlined-basic"
              label="Scale"
              variant="outlined"
              value={scale}
              onChange={onScaleChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              onClick={onCreateClick}
              disabled={!!!geometry && !!!scale}
              variant="contained"
            >
              CREATE
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className="elements">
         {elements.map((item,index) => (
          <div key={index} className="item">
            <p>{item.uuid}</p>
            <Button onClick={() => removeItem(item)}>X</Button>
          </div>
         ))}
      </div>
    </Container>
  );
}

export default App;
