// As an air traffic controller
// So I can get passengers to a destination
// I want to instruct a plane to land at an airport and confirm that it has landed

describe("Airport", function() {

  var plane;
  var airport;

  beforeEach(function() {
    airport = new Airport();
  });

  it("instructs a plane to land and confirms has landed", function() {
    spyOn(airport, 'isStormy').and.returnValue(false);
    airport.land(plane);
    expect(airport.landedPlanes).toContain(plane);
  });

  // As an air traffic controller
  // So I can get passengers on the way to their destination
  // I want to instruct a plane to take off from an airport and confirm that it is no longer in the airport

  it("instructs a plane to take off and confirms has left the airport", function() {
    spyOn(airport, 'isStormy').and.returnValue(false);
    airport.takeOff(plane);
    expect(airport.landedPlanes).not.toContain(plane);
  });

  // As an air traffic controller
  // To ensure safety
  // I want to prevent landing when the airport is full

  it("prevents a plane from landing when aiport full", function() {
    spyOn(airport, 'isStormy').and.returnValue(false);
    for(i = 0; i < (airport.DEFAULTCAPACITY); i ++) {
      airport.land(plane);
    }
    expect( function(){airport.land(plane); } ).toThrow("Airport is full, jog on");
  });

  // As the system designer
  // So that the software can be used for many different airports
  // I would like a default airport capacity that can be overridden as appropriate

  it("can override the DEFAULTCAPACITY", function() {
    spyOn(airport, 'isStormy').and.returnValue(false);
    airport.DEFAULTCAPACITY = 30;
    expect(airport.DEFAULTCAPACITY).toEqual (30);
    for(i = 0; i < (airport.DEFAULTCAPACITY); i ++) {
      airport.land(plane);
    }
    expect(airport.landedPlanes.length).toEqual (30);
  });

  // As an air traffic controller
  // To ensure safety
  // I want to prevent takeoff when weather is stormy
  it("prevents take off when weather is stormy", function() {
    spyOn(airport, 'isStormy').and.returnValue(true);
    expect( function(){airport.takeOff(plane); } ).toThrow("It's raining men! Hallelujah! (But you can't take off.)");
  });

  // As an air traffic controller
  // To ensure safety
  // I want to prevent landing when weather is stormy
  it("prevents landing when weather is stormy", function() {
    spyOn(airport, 'isStormy').and.returnValue(true);
    expect( function(){airport.land(plane); } ).toThrow("It's raining men! Hallelujah! (But you can't land.)");
  });

});
