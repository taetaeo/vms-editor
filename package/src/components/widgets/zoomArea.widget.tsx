import * as R from "react";
import cn from "classnames";

interface Props extends R.HTMLAttributes<HTMLDivElement> {
  scale?: number;
  style?: R.CSSProperties;
}

const ZoomAreaWidget: R.FC<Props> = R.forwardRef<HTMLDivElement, Props>(function Component(
  // Props
  { className = "vms-editor-zoom-area", scale = 0.5, style, children, ...rest },

  // Ref
  forwardRef
) {
  const scaleCn = `scale-${scale}`;

  return (
    <div ref={forwardRef} className={cn(className, scaleCn)} style={style} {...rest}>
      {children}
    </div>
  );
});

export default ZoomAreaWidget;
