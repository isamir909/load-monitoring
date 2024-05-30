// function drawCircle(canvas: HTMLCanvasElement, currentLoad: number) {
//   if (!canvas) {
//     console.error("Canvas element is required.");
//     return;
//   }

//   const context = canvas.getContext("2d");
//   if (!context) {
//     console.error("Failed to get 2D context.");
//     return;
//   }

//   // Define constants
//   const WIDTH = 200;
//   const HEIGHT = 200;
//   const CENTER_X = 100;
//   const CENTER_Y = 100;
//   const INNER_RADIUS = 70;
//   const OUTER_RADIUS = 75;
//   const START_ANGLE = Math.PI * 1.5;
//   const FULL_CIRCLE = Math.PI * 2;

//   // Ensure currentLoad is within 0-100
//   currentLoad = Math.max(0, Math.min(100, currentLoad));

//   // Draw Inner Circle
//   canvas.width = WIDTH;
//   canvas.height = HEIGHT;
//   context.clearRect(0, 0, WIDTH, HEIGHT);
//   context.fillStyle = "#ccc";
//   context.beginPath();
//   context.arc(CENTER_X, CENTER_Y, INNER_RADIUS, 0, FULL_CIRCLE);
//   context.closePath();
//   context.fill();

//   // Determine stroke color based on currentLoad
//   let strokeColor;
//   if (currentLoad < 20) {
//     strokeColor = "#00ff00";
//   } else if (currentLoad < 40) {
//     strokeColor = "#337ab7";
//   } else if (currentLoad < 60) {
//     strokeColor = "#f0ad4e";
//   } else {
//     strokeColor = "#d9534f";
//   }

//   // Draw the outer arc
//   context.lineWidth = 10;
//   context.strokeStyle = strokeColor;
//   context.beginPath();
//   context.arc(
//     CENTER_X,
//     CENTER_Y,
//     OUTER_RADIUS,
//     START_ANGLE,
//     (FULL_CIRCLE * currentLoad) / 100 + START_ANGLE
//   );
//   context.stroke();
// }





function drawCircle(canvas: HTMLCanvasElement, currentLoad: number) {
  if (!canvas) {
    console.error("Canvas element is required.");
    return;
  }

  if (typeof window !== 'undefined') { // Check for window object (browser)
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Failed to get 2D context.");
      return;
    }
    // Rest of your drawing logic using context...

  // Define constants
  const WIDTH = 200;
  const HEIGHT = 200;
  const CENTER_X = 100;
  const CENTER_Y = 100;
  const INNER_RADIUS = 70;
  const OUTER_RADIUS = 75;
  const START_ANGLE = Math.PI * 1.5;
  const FULL_CIRCLE = Math.PI * 2;

  // Ensure currentLoad is within 0-100
  currentLoad = Math.max(0, Math.min(100, currentLoad));

  // Draw Inner Circle
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  context.clearRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = "#ccc";
  context.beginPath();
  context.arc(CENTER_X, CENTER_Y, INNER_RADIUS, 0, FULL_CIRCLE);
  context.closePath();
  context.fill();

  // Determine stroke color based on currentLoad
  let strokeColor;
  if (currentLoad < 20) {
    strokeColor = "#00ff00";
  } else if (currentLoad < 40) {
    strokeColor = "#337ab7";
  } else if (currentLoad < 60) {
    strokeColor = "#f0ad4e";
  } else {
    strokeColor = "#d9534f";
  }

  // Draw the outer arc
  context.lineWidth = 10;
  context.strokeStyle = strokeColor;
  context.beginPath();
  context.arc(
    CENTER_X,
    CENTER_Y,
    OUTER_RADIUS,
    START_ANGLE,
    (FULL_CIRCLE * currentLoad) / 100 + START_ANGLE
  );
  context.stroke();
  }
}
export default drawCircle;






