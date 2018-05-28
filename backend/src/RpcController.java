package backend;

import com.google.protobuf.RpcCallback;

public class RpcController implements com.google.protobuf.RpcController {
  private boolean failed = false;
  private boolean cancelled = false;
  private String error = null;
  private RpcCallback<Object> callback = null;

  public String errorText() {
    return error;
  }

  public boolean failed() {
    return failed;
  }

  public boolean isCanceled() {
    return cancelled;
  }

  public void notifyOnCancel(RpcCallback<Object> notifyCallback) {
    callback = notifyCallback;
  }

  public void reset() {
    failed = false;
    cancelled = false;
    callback = null;
    error = null;
  }

  public void setFailed(String reason) {
    failed = true;
  }

  public void startCancel() {
    cancelled = true;
    callback.run(null);
  }
}