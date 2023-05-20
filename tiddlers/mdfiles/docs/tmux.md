## Tmux

ctrl + a /  ctrl + b      # prefix

prefix -  # 垂直平分 窗口

`prefix> C-c`表示您必须先按Ctrl+a或Ctrl+，b再按Ctrl+c

prefix C c  # 新建会话  creat

prefix s   # 选择窗口 select    安装x进行关闭窗口
prefix ?   # show all shortkeys
prefix and press x   # 关闭整个tmux

prefix  d # 临时退出tmux   deattch

tmux  a -t  (nu)  # 连接已经存在的session  panel->window->session

tmux ls   # 列出所有的window

prefix t  # show time

prefix [   # 进入复制模式    进入可视模式    prefix ] 粘贴

q # 退出

prefix nu # 切换窗口

*  tmux  new -s daily # creat a session called daily.
*  C-b , # rename this window's name
*  C-b w # show all window
*  tmux kill-session -t session-name # kill one session
*  tmux kill-pane -t pane-name .
*  tmux a # defult to connect the first session.
*  C-b z # zoom in or reset this pane
*  C-b r # source this .tumu.conf
*  [tmux-tutor](https://louiszhai.github.io/2017/09/30/tmux/#%E4%BF%9D%E5%AD%98Tmux%E4%BC%9A%E8%AF%9D)

# tips
- pgrep tmux
- prefix z  // zoom panel
- prefix m // toggle mouse mode
