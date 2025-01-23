import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float"

actor DBank{
  stable var currentValue:Float = 300;
  currentValue := 300;

  let id = 234567890;

  //Debug.print(debug_show(id));

  stable var startTime = Time.now();
  startTime := Time.now();
  Debug.print(debug_show(startTime));

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
    
  };

  public func withdraw(amount: Float) {
    let temp: Float = currentValue - amount;
    if(temp>=0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("cannot get negative values");
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue* (1.01** Float.fromInt(timeElapsedS));
    startTime := currentTime;
    Debug.print(debug_show(currentValue));
  }
}