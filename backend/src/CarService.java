package backend;

import static schema.Manufacturer.TOYOTA;
import static schema.Manufacturer.HONDA;

import com.google.protobuf.RpcController;
import com.google.protobuf.RpcCallback;

import schema.Car;
import schema.GetCarsRequest;
import schema.Manufacturer;
import schema.GetCarsResponse;

public class CarService extends schema.CarService {
  private static final Car newCar(String model, Manufacturer manufacturer) {
    return Car.newBuilder().setModel(model).setManufacturer(manufacturer).build();
  }

  @Override
  public void getCars(
      RpcController controller, GetCarsRequest request, RpcCallback<GetCarsResponse> done) {
    switch (request.getManufacturer()) {
      case TOYOTA:
        done.run(GetCarsResponse.newBuilder()
                     .addCars(newCar("Corolla", TOYOTA))
                     .addCars(newCar("Camry", TOYOTA))
                     .build());
        break;
      case HONDA:
        done.run(GetCarsResponse.newBuilder()
                     .addCars(newCar("Civic", HONDA))
                     .addCars(newCar("Accord", HONDA))
                     .build());
        break;
      default:
        done.run(GetCarsResponse.getDefaultInstance());
    }
  }
}