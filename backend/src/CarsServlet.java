package backend;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import com.google.protobuf.RpcCallback;
import com.google.protobuf.Message;

import schema.GetCarsRequest;

import schema.Car;
import schema.GetCarsResponse;

public class CarsServlet extends HttpServlet {
  private static final CarService carService = new CarService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/x-protobuf");
    RpcController rpcController = new RpcController();
    RpcCallback<GetCarsResponse> callback = getCallback(response);

    switch (request.getQueryString().replace("method=", "")) {
      case "getCars":
        carService.getCars(
            rpcController, GetCarsRequest.parseFrom(request.getInputStream()), callback);
        break;
      default:
        response.setStatus(HttpServletResponse.SC_NOT_IMPLEMENTED);
    }
  }

  private static <M extends Message> RpcCallback<M> getCallback(HttpServletResponse response) {
    return new RpcCallback<M>() {
      public void run(M message) {
        try {
          message.writeTo(response.getOutputStream());
          response.setStatus(HttpServletResponse.SC_OK);
        } catch (IOException e) {
          response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
      }
    };
  }
}
