### Reverd
* git revert id    # 会有冲突出现  ？

### Log
* git log --stat    # 查看变动的具体文件
* git reflog    # show local log
* git log --all --graph   #查看所有的分支记录  直观
* git log --all -n 4 --graph  --oneline     # 结合  部分的参数

### Misc
* git -b develop https://github.com/..... # only to clone a appointment
* git ls-remote  //  detail

### Status
* git show -sb

### Count
* git rev-list --count branch_name

### Gc
- git gc

### Show
* git show main:readme.md

### Tag
* git tag name
* git tag -a tagname commit_id
- git tag -a v2.0.1 -m "demo test"
- git tag -d v2.0.1
- git push origin :refs/tags/v2.0  delete remote tags
- git checkout v2.0
* git push --tags

### Reset
* git reset -- filename  or git restore --staged/-S <filename>
* git restore file (workspace)
* git reset --hard id / tag

### Diff
* git diff main dev
* git diff --staged

### Gitignore
* doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
* 匹配模式最后跟"/"说明要忽略的是目录
* 可以忽略该仓库的所有文件,不用写递归的路径
* deploy*/   # 忽略以deploy开头任意字符结束的目录

### Remote
* git remote rm origin           # 删除已经关联的远程仓库
* git remote add github git@github:oeyoews/src-gitee.git
* git remote [-v]

### Branch
* git branch -vv # only show local branchh
* git  branch branchname   # 建立新分支
* git branch –d branchname （D,force delete）
* git branch -m old new # only to local, can't modify remote repo
- git branch -m main        # current branch
* git branch -a/-r

### Checkout
* git checkout -- name //使用head的最新内容替换工作目录的内容LL ( only workspace)
* git checkout branchname         # switch anotherbranch (git branch dev    && git checkout dev)
* git checkout --orphan=new-br    #  根据当前的分支，生成新的分支，但是没有提交记录，只能提交才能看到新的分支
* git checkout --merge <branch>
* git checkout . # restore the current directory to lasted commits
* git checkout filename # in workspace
* git checkout -                  # 切换到上个分支

### Push
* git push -f
* git pull -p # 在拉去的时候自动删除远程分支已经不存在的本地分支  prune
* git push --all origin # 将本地的所有分支推送到远程主机，不论是否存在与否
* `git push origin  <branchname>`   # 将新的分支推送到远端
* 也可以进行强行推送（not recommend），直接把远程仓库覆盖掉
* `git push origin  master --force`
* `git push origin  :master`
表示推送一个空的分支到远程的master分支。相当于删除远程的master分支；
等同`git push origin --delete master`
`git push -all origin `
 不管远程仓库是否存在相应的分支，将本地的所有的分支全部推送上去。
`git push -f  origin `
`git push -f -u origin master            `
版本回退 但是会抹去远程库的提交信息 首先进行本地的版本回退，由于进行里本地的版本回滚，版本将落后于远程分支，因此必须要使用强制推送进行版本覆盖，然后进行向远程仓库强制推送  master 为默认本仓库创建的第一个分支， 而 origin为默认是指向这一个仓库，相当于别名

### Commit
* git commit -am ' '  // commit file message already added

### Merge
* git branch --merged    # 显示已经合并到当前分支的分支列表  --no-merged
* git pull  --rebase origin master  # 根据远端的readme生成readme文件，在本地生成readme文件
* git push -f gitee master      # 强制上传，覆盖掉远端的文件（注意，远端确定没有重要的文件）
* git push origin --all # 推送所有的分支到远程仓库
* git push -u origin bugs    #    将本地的bugs分支推送到远程的bugs，如果没有则会被建立，并且建立两者的关联，之后直接使用git push  就可以

### Cache
* git rm -r --cached .
* git rm --cached [file]

### Mv
* git mv xxx xxxx   # 可以在暂存区直接修改，不用再次提交

### Config
* ~/.gitconfig   # 全局配置文件
* git config --global core.editor vim
* git config --global credential.helper store    # 存储账户密码，但是需要输入一次
* git config -l # 列出git的初始化信息。  可以查看当前的仓库链接的是那个具体仓库
* git config --global user.name "oeyoews"
* git config --global user.email "2956398608@qq.com" # 带有空格

### Ssh
* ssh-keygen
* ~/.ssh/id_ras.pub
* ssh -T git@github.com

### Multi_repository_address
* 在.git 文件里面的url下面添加一个新的url，可以同时推送到github和gitee上。

### Gitlab
* settings -> general -> advance  # 修改clone的地址 gitlab

### Enhance_speed
* https://raw.githubusercontent.com/ 进行了代理，地址为 https://raw.fastgit.org/ 。

### GitReset
`git reset --hard id  `
hard 表示将工作区 暂存区 版本库记录 恢复到某一定版本，commit的信息会被删除，并且不会保存之前错误的源码， id不确定要写几位，一般写前面几位就行了，git会自动寻找   HEAD 表示当前版本
`git reset  --mixed `
> 等于 ` git reset` ，会保留源码，就是之前的所有提交信息都会被保留，只是将commit和index的信息回退，即更改指针的指向,reset 的指针向后移动了，删除里一些commit，而revert的指针是一直向前的，在commit之后有commit一次

### Relative_web
[thin_large_repository](https://gitee.com/help/articles/4232#article-header0)
[auto push in gitlab github gitee](https://www.cnblogs.com/sxdcgaq8080/p/10530176.html)
[Linux and Git](https://www.tag1consulting.com/blog/interview-linus-torvalds-linux-and-git)

### git_submoudle(子模块)
- https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97
- git clone url --recurse-submoudles
- git submodule init && git submoudle update
- git submoudle update --init --recursive
- git submoudle add url /path/name
- git submoudle update --remote

### git pull
- git pull origin --depth 1 develop:main

### commit
- git commit -m " empty commit " --allow-empty

- git remote set-url ... // change remote url

- git fetch (get all branches ???)

## Note
- if a new file never recorded by git, even you switch new branch, modify anyaway, it's influencd for all branch
- and if the file is recorded, if you don't add or Commit to switch another branch, it's will fetch current file jobs to
  next branch, unless you commit it's job
