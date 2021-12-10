const NORMAL = "#";
const DAMAGE = "x";

export default function Ship(shipName) {
  const shipLength = determineShipLength(shipName);
  const shipArray = Array(shipLength).fill(NORMAL);

  return {
    getLength() {
      return shipLength;
    },
    getHitPositions() {
      return shipArray.map(transformDamagesToHitPositions).filter(outHitPositions);
    },
    hit(targetPosition) {
      if (targetPosition < 1 || targetPosition > shipLength) {
        throw new Error(
          `Invalid target position "${targetPosition}" for "${shipName.toLowerCase()}"`,
        );
      }

      shipArray[targetPosition - 1] = DAMAGE;
    },
    isSunk() {
      return this.getHitPositions().length === shipLength;
    },
  };
}

function determineShipLength(shipName) {
  switch (shipName.toLowerCase()) {
    case "battleship":
      return 4;
    case "destroyer":
      return 3;
    case "submarine":
      return 2;
    case "patrolboat":
      return 1;
    default:
      throw new Error(`Invalid ship name ${shipName}`);
      break;
  }
}

function transformDamagesToHitPositions(shipBody, idx) {
  if (shipBody === DAMAGE) {
    return idx + 1;
  }

  return shipBody;
}

function outHitPositions(shipBody) {
  return shipBody !== NORMAL;
}
