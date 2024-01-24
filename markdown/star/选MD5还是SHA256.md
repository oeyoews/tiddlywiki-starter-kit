---
title: '选MD5还是SHA256'
tags: ['剪藏']
type: 'text/markdown'
created: 'Thu Nov 09 2023 02:53:51 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://hicalvin.github.io/tech/2022/11/md5_or_sha256'
---

# 选MD5还是SHA256

MD5 和 SHA256 是两种非常流行的加密算法，被用于存储敏感数据（如密码）。那么我们在日常工作中到底是选择 MD5 还是 SHA256 呢？

**总的来说，SHA256 会比 MD5 更好，因为加密后的字段长度是 MD5 的两倍，从而造成了更低的哈希碰撞。虽然生成 SHA256 的速度相对会慢一点，但性能的下降并不会对使用造成影响**。

## 什么是 MD5 (Message Digest 5)

### 定义

> The MD5 message-digest algorithm is a widely used hash function producing a 128-bit hash value. Although MD5 was initially designed to be used as a cryptographic hash function, it has been found to suffer from extensive vulnerabilities. It can still be used as a checksum to verify data integrity, but only against unintentional corruption. – 维基百科

简而言之，MD5 在以下两个场合被使用的最多：

* 哈希函数：在互联网初期，MD5 经常是被用于密码加密的默认选择。基于安全考虑，如今这已不再是一个好主意了

* 校验：MD5 在被用来检验文件传输后的完整性时是一个非常好的选项。通过使用 MD5 做校验，我们可以确保收到的文件与服务器端发布的文件是相一致的。

#### 校验

比如 Bob 从 Alice 那里收到了一条消息和摘要的匹配对。为了验证消息的透明性和完整性，Bob 就要用加密哈希函数运行给定的消息，从而得到一个新的摘要。如果生成的摘要与送过来的摘要相一致，那么就能说明传输信息的完整性了。

#### 哈希函数

MD5 的第二个用处就是作为哈希函数对一段字符串比如密码进行编码。比如如果对“MD5Online”进行哈希运算，就会产生“d49019c7a78cdaac54250ac56d0eda8a”这样的结果，而且无论你用什么 MD5 工具做转换，得到的总是这样么一个词，不会改变

#### 规则

从生物识别的角度，传递的消息本体和摘要对代表的就是一份物理文档和用于解锁的指纹。唯一的区别是消息体和摘要可以被分开传输，而物理文档解锁的指纹信息需要一起存在。

* 摘要不允许在传输过程中被篡改

* 加密算法应该是单向，不允许被反向计算出来的

* 作为完整性检查器，信息摘要是需要发送者的私钥加密认证才发送的

#### 速度

MD5 算法是目前最快的一种加密算法之一。对一段文本进行哈希远算几乎是瞬间的，哪怕是对一个大的文件，也只需要几秒时间

### 为什么 MD5 不再被推荐

MD5 之所以不再被推荐，是因为有研究者发现这种加密方式能通过生成加密碰撞而越过验证。而且即便使用野蛮破解去尝试几十亿的密码，也不需要花太多时间

## SHA256

### 定义

> SHA-256 stands for Secure Hash Algorithm 256-bit, and it’s used for cryptographic security. – Google

SHA-256 是就 SHA-2 算法的，这也是对 SHA-1 的提升。SHA-1 提供了 160 位的输出，而 SHA-25，正如名称描述的那样，提供了 256 位的哈希函数。

### 举例

如果我们还是用字符串”MD5Online”作为输入，那么 SHA256 的加密结果就是”c22f9aa9311ac8c339b3d9c0515989d481aa03d5a14d0d1a0ae6499bd3fc91ae”

### 速度

SHA-256 不是最快的算法，而且追求加密速度也不是它的目的，但是它在实际使用中已经足够快，去加密一些非关键数据，如 VPN 链接，文件校验或者其他的一些消息加密。

### 安全

当使用哈希函数时，没有一种算法可以保证说是百分之百安全的，但 SHA-256 已经比大多数加密算法都要安全了。理论上，只要算力足够，几乎任何一种基本的加密算法都可以被长时间的尝试而绕开。

所以用 SHA-256 并不推荐用于密码存储，但是对于一些像 VPN 链接来说已经足够

## MD5 和 SHA-256 的区别

### 输出长度

MD5 会产生一个 128 位长的密码，也就是 32 个十六进制的字符。SHA-256 算法得出的长度是 MD5 的两倍长，也就是 64 个十六进制字符的 256 位二进制。

### 加密速度

MD5 几乎是最快的一种加密算法，而 SHA-256 则要慢 20%。

> 如果你选择速度作为加密算法的主要考量标准，那么可以考虑继续使用 MD5

### 安全性

SHA-256 不是完美的加密算法，但是比 MD5 还是要相对更加安全。它产生了两倍于 MD5 的加密字串，所以哈希碰撞的可能性也会比 MD5 来的更低。比如比特币区块链里面的哈希值生成，使用的就是 SHA256。

### 哪个更好

总的来说，目前会倾向于使用 SHA-256。

### Reference

[MD5 vs SHA256: Which is Better](https://infosecscout.com/md5-vs-sha256/) [*原创*]

[Blockchain.com](https://blockchain.info/)

This post is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) by the author.
