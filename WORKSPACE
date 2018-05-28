workspace(name = "api_schemas_with_bazel")

####################################
# Download Bazel toolchain dependencies as needed by build actions

# The Bazel buildtools repo contains tools like the BUILD file formatter, buildifier
http_archive(
    name = "com_github_bazelbuild_buildtools",
    # Note, this commit matches the version of buildifier in angular/ngcontainer
    url = "https://github.com/bazelbuild/buildtools/archive/b3b620e8bcff18ed3378cd3f35ebeb7016d71f71.zip",
    strip_prefix = "buildtools-b3b620e8bcff18ed3378cd3f35ebeb7016d71f71",
    sha256 = "dad19224258ed67cbdbae9b7befb785c3b966e5a33b04b3ce58ddb7824b97d73",
)

# Fetch the NodeJS rules
http_archive(
    name = "build_bazel_rules_nodejs",
    url = "https://github.com/bazelbuild/rules_nodejs/archive/0.9.1.zip",
    strip_prefix = "rules_nodejs-0.9.1",
    sha256 = "6139762b62b37c1fd171d7f22aa39566cb7dc2916f0f801d505a9aaf118c117f",
)

# Fetch the webtesting rules
http_archive(
    name = "io_bazel_rules_webtesting",
    url = "https://github.com/bazelbuild/rules_webtesting/archive/ca7b8062d9cf4ef2fde9193c7d37a0764c4262d7.zip",
    strip_prefix = "rules_webtesting-ca7b8062d9cf4ef2fde9193c7d37a0764c4262d7",
    sha256 = "28c73cf9d310fa6dba30e66bdb98071341c99c3feb8662f2d3883a632de97d72",
)

# Fetch the TypeScript rules
http_archive(
    name = "build_bazel_rules_typescript",
    url = "https://github.com/bazelbuild/rules_typescript/archive/0.14.0.zip",
    strip_prefix = "rules_typescript-0.14.0",
    sha256 = "90aa6e1996a14cedfbe64445d5dcf8bbaeec8292cbb177bc9002e77543bc731f",
)

# Some of the TypeScript is written in Go.
# Bazel doesn't support transitive WORKSPACE deps, so we must repeat them here.
http_archive(
    name = "io_bazel_rules_go",
    url = "https://github.com/bazelbuild/rules_go/releases/download/0.11.0/rules_go-0.11.0.tar.gz",
    sha256 = "f70c35a8c779bb92f7521ecb5a1c6604e9c3edd431e50b6376d7497abc8ad3c1",
)

# Webtesting rules depend on io_bazel
# Bazel doesn't support transitive WORKSPACE deps, so we must repeat them here.
http_archive(
    name = "io_bazel",
    url = "https://github.com/bazelbuild/bazel/releases/download/0.9.0/bazel-0.9.0-dist.zip",
    sha256 = "efb28fed4ffcfaee653e0657f6500fc4cbac61e32104f4208da385676e76312a",
)

# Webtesting rules depend on bazel_gazelle
# Bazel doesn't support transitive WORKSPACE deps, so we must repeat them here.
http_archive(
    name = "bazel_gazelle",
    url = "https://github.com/bazelbuild/bazel-gazelle/releases/download/0.10.1/bazel-gazelle-0.10.1.tar.gz",
    sha256 = "d03625db67e9fb0905bbd206fa97e32ae9da894fe234a493e7517fd25faec914",
)

# Fetch the Sass rules
git_repository(
    name = "io_bazel_rules_sass",
    remote = "https://github.com/bazelbuild/rules_sass.git",
    tag = "0.0.3",
)

####################################
# Tell Bazel about some workspaces that were installed from npm.
local_repository(
    name = "angular",
    path = "node_modules/@angular/bazel",
)

local_repository(
    name = "rxjs",
    path = "node_modules/rxjs/src",
)

# proto_library, cc_proto_library, and java_proto_library rules implicitly
# depend on @com_google_protobuf for protoc and proto runtimes.
# This statement defines the @com_google_protobuf repo.
http_archive(
    name = "com_google_protobuf",
    sha256 = "cef7f1b5a7c5fba672bec2a319246e8feba471f04dcebfe362d55930ee7c1c30",
    strip_prefix = "protobuf-3.5.0",
    urls = ["https://github.com/google/protobuf/archive/v3.5.0.zip"],
)

# java_lite_proto_library rules implicitly depend on @com_google_protobuf_javalite//:javalite_toolchain,
# which is the JavaLite proto runtime (base classes and common utilities).
http_archive(
    name = "com_google_protobuf_javalite",
    sha256 = "d8a2fed3708781196f92e1e7e7e713cf66804bd2944894401057214aff4f468e",
    strip_prefix = "protobuf-5e8916e881c573c5d83980197a6f783c132d4276",
    urls = ["https://github.com/google/protobuf/archive/5e8916e881c573c5d83980197a6f783c132d4276.zip"],
)

http_archive(
    name = "io_bazel_rules_appengine",
    sha256 = "d1fbc9a48332cc00b56d66751b5eb911ac9a88e820af7a2316a9b5ed4ee46d0b",
    strip_prefix = "rules_appengine-0.0.7",
    url = "https://github.com/bazelbuild/rules_appengine/archive/0.0.7.tar.gz",
)

http_archive(
    name = "io_bazel_skydoc",
    url = "https://github.com/bazelbuild/skydoc/archive/0.1.4.zip",
    strip_prefix = "skydoc-0.1.4",
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories")
node_repositories(package_json = ["//:package.json"])

load("@io_bazel_rules_sass//sass:sass.bzl", "sass_repositories")
sass_repositories()

load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")
ts_setup_workspace()

load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")
go_rules_dependencies()
go_register_toolchains()

load("@io_bazel_rules_webtesting//web:repositories.bzl", "browser_repositories", "web_test_repositories")
web_test_repositories()
browser_repositories(
    chromium = True,
)

load("@io_bazel_rules_appengine//appengine:appengine.bzl", "appengine_repositories")
appengine_repositories()

load("@io_bazel_skydoc//skylark:skylark.bzl", "skydoc_repositories")
skydoc_repositories()