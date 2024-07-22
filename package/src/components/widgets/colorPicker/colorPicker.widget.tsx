import { SketchPicker, ColorResult, ChromePicker } from "react-color";
import * as React from "react";

type ColorPickerWidgetType = "sketch" | "chrome";

interface ColorPickerWidgetProps {
  type?: ColorPickerWidgetType;
  initialColor: string;
  onColorChange: (color: string) => void;

  onCallbackFontColor?: (color: string) => void;
}

interface ColorPickerState {
  type?: ColorPickerWidgetType;
  color: string;
}

class ColorPickerWidget extends React.Component<ColorPickerWidgetProps, ColorPickerState> {
  constructor(props: ColorPickerWidgetProps) {
    super(props);
    this.state = {
      type: props.type,
      color: props.initialColor, // Get initial Color from props
    };
  }

  handleChangeComplete = (color: ColorResult) => {
    const { hex } = color;

    this.setState({ color: hex });
    this.props.onColorChange(hex); // Set New Color to outer

    if (this.props.onCallbackFontColor && typeof this.props.onCallbackFontColor === "function") {
      this.props.onCallbackFontColor(hex);
    }
  };

  render() {
    return (
      <>
        {this.props.type === "sketch" && <SketchPicker color={this.state.color} onChangeComplete={this.handleChangeComplete} />}
        {this.props.type === "chrome" && <ChromePicker color={this.state.color} onChangeComplete={this.handleChangeComplete} />}
      </>
    );
  }
}

export default ColorPickerWidget;
