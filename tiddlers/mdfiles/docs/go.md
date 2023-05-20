## go

- go env -json
- 1.13
- go env -w GO111MODULE=on
- go env -w GOPROXY=https://goproxy.cn,direct
-  go env -u GOPROXY


## Learn go
- go run ..
- go build ...
  - go build -o <path_filename> <original_path_filename>
- go mod init hello(root directory name)


## Path
  - (default is enable for goland, remove it and projeco's gopath), only 开启go  moudles ![go](./images/go.png)
- go install .../src/xxx  安装二进制文件到~/go (default)
  - 使用到了绝对绝对路径 项目名/src/package, go.md 的项目名关系到import 首先要包括模块名
  - go.mod: location put this file in src/ generally

  - go mod dir: ![godir](./images/gomoddir.png)
- go.mod  moudle github.com/oeyoews(no slash)
