- aria2c -S xxx.torrent  # list all contents in xxx.torrent
- aria2c -x 2 ...link
- aria2c -o name ...link
- aria2c -s 2 -x 2 -j 10 http://dl_dir.qq.com/qqfile/qq/QQ2011/QQ2011.exe

这将使用 2 个连接来下载该文件。s 后面的参数值介于 1~5 之间，你可以根据实际情况选择。

PS：-s这个参数的意思是使用几个线程进行下载，-x是最大使用几个线程下载，-j就是同时下载几个文件。（这个是我的理解对不对不清楚）
- aria2c -d <dirname> <url>
