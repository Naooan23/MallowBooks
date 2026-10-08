import type { BackGroundImageProps } from "./ComponentsTypes";

export const BackGroundImage = ({ image, color, children }: BackGroundImageProps) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: color,
      }}
    >
      <img
        src={image}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "10rem",
          height: "10rem",
          objectFit: "contain",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      <img
        src={image}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "10rem",
          height: "10rem",
          objectFit: "contain",
          transform: "rotate(90deg)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>

      <img
        src={image}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "10rem",
          height: "10rem",
          objectFit: "contain",
          transform: "rotate(275deg)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      <img
        src={image}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "10rem",
          height: "10rem",
          objectFit: "contain",
          transform: "rotate(180deg)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
    </div>
  );
};
