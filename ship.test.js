import Ship from "./ship";

test("creates a ship correctly", () => {
  const battleship = Ship("battleship");

  expect(Object.entries(battleship).length).toBe(4);

  expect(battleship.getLength()).toBe(4);
  expect(Ship("destroyer").getLength()).toBe(3);
  expect(Ship("submarine").getLength()).toBe(2);
  expect(Ship("patrolboat").getLength()).toBe(1);

  expect(battleship.getHitPositions()).toEqual([]);
  expect(typeof battleship.hit === "function").toBe(true);
  expect(typeof battleship.isSunk === "function").toBe(true);
});

test("fails to create an invalid ship", () => {
  expect(() => Ship("")).toThrow();
  expect(() => Ship("ship")).toThrow();
});

test("ship can get hit", () => {
  const battleship = Ship("battleship");
  const patrolBoat = Ship("patrolboat");

  battleship.hit(1);
  battleship.hit(4);
  patrolBoat.hit(1);

  expect(battleship.getHitPositions()).toEqual([1, 4]);
  expect(patrolBoat.getHitPositions()).toEqual([1]);
});

test("report if ship is sunk", () => {
  const battleship = Ship("battleship");
  const destroyer = Ship("destroyer");
  const patrolBoat = Ship("patrolboat");

  battleship.hit(1);
  battleship.hit(2);
  battleship.hit(3);
  battleship.hit(4);
  patrolBoat.hit(1);

  expect(battleship.isSunk()).toBe(true);
  expect(destroyer.isSunk()).toBe(false);
  expect(patrolBoat.isSunk()).toBe(true);
});
