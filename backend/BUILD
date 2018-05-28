# Based on https://github.com/bazelbuild/examples/blob/master/tutorial/backend/BUILD

load("@io_bazel_rules_appengine//appengine:appengine.bzl", "appengine_war")

package(default_visibility = ["//visibility:public"])

appengine_war(
    name = "backend",
    data_path = "webapp",
    jars = [":app_deploy.jar"],
    data = ["//backend:webapp", ":zone.js", ":protobuf.js", ":long.js"],
)

genrule(
    name = "zone.js",
    srcs = ["//:node_modules/zone.js/dist/zone.min.js"],
    outs = ["webapp/zone.min.js"],
    cmd = "cp $< $@",
)

genrule(
    name = "long.js",
    srcs = ["//:node_modules/long/dist/long.js"],
    outs = ["webapp/long.min.js"],
    cmd = "cp $< $@",
)

genrule(
    name = "protobuf.js",
    srcs = ["//:node_modules/protobufjs/dist/protobuf.min.js"],
    outs = ["webapp/protobuf.min.js"],
    cmd = "cp $< $@",
)

filegroup(
    name = "webapp",
    srcs = glob(["webapp/**/*"]),
)

java_binary(
    name = "app",
    srcs = glob(["src/**/*.java"]),
    main_class = "does.not.exist",
    deps = [
        "//schema:car_java_proto",
        "@io_bazel_rules_appengine//appengine:javax.servlet.api",
        "@com_google_protobuf//:protobuf_java",
    ],
)