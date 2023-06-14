一、环境准备
（一）硬件方面：
1. 显存
4G起步，4G显存支持生成512*512大小图片，超过这个大小将卡爆失败。

2. 硬盘
10G起步，模型基本都在5G以上，有个30G硬盘不为过吧？现在硬盘容量应该不是个问题。

（二）软件方面：
1. Git
https://git-scm.com/download/win
下载最新版即可，对版本没有要求。

2. Python
https://www.python.org/downloads/
截止发稿（2023.3.6）时，最高版本只能用3.10.*，用3.11.*会出问题。

3. Nvidia CUDA
https://developer.download.nvidia.cn/compute/cuda/11.7.1/local_installers/cuda_11.7.1_516.94_windows.exe
版本11.7.1，搭配Nvidia驱动516.94，可使用最新版。

4. stable-diffusion-webui
https://github.com/AUTOMATIC1111/stable-diffusion-webui
核心部件当然用最新版本~~但注意上面三个的版本的兼容性。

5. 中文语言包
https://github.com/VinsonLaro/stable-diffusion-webui-chinese
下载chinese-all-0306.json 和 chinese-english-0306.json文件

6. 扩展（可选）
https://github.com/Mikubill/sd-webui-controlnet
下载整个sd-webui-controlnet压缩包

https://huggingface.co/Hetaneko/Controlnet-models/tree/main/controlnet_safetensors
https://huggingface.co/lllyasviel/ControlNet/tree/main/models
https://huggingface.co/TencentARC/T2I-Adapter/tree/main
试用时先下载第一个链接中的control_openpose.safetensors 或 第二个链接中的control_sd15_openpose.pth文件

7. 模型
https://huggingface.co/models
https://civitai.com
可以网上去找推荐的一些模型，一般后缀名为ckpt、pt、pth、safetensors ，有时也会附带VAE（.vae.pt）或配置文件（.yaml）。

类型	文件格式	存放目录	备注
check point	.ckpt，.safetensors	\models\Stable-diffusion	文件较大
vae	名字带有vae的	\models\vae	细节更好地恢复，特别是眼睛和文字
Textual Inversion	*.pt	\embeddings	一般文件很小，额外的tag
Lora	*.pt	\models\Lora	调整模型，理解为风格化也可以
Hypernetworks	.pt，.ckpt，*.safetensors	\models\hypernetworks	和lora工作方式相似，算法不同
这里可以学习一下模型的基本概念《解析不同种类的StableDiffusion模型Models，再也不用担心该用什么了》

二、安装流程
1. 安装Git
就正常安装，无问题。

2. 安装Python
建议安装在非program files、非C盘目录，以防出现目录权限问题。
注意安装时勾选Add Python to PATH，这样可以在安装时自动加入windows环境变量PATH所需的Python路径。

3. 安装Nvidia CUDA
正常安装，无问题。

4. 安装stable-diffusion-webui
国内需要用到代理和镜像，请按照下面的步骤操作：

a) 编辑根目录下launch.py文件
将https://github.com替换为https://ghproxy.com/https://github.com，即使用Ghproxy代理，加速国内Git。
如图将代码中所有类似地址都改掉（注意：不仅仅是图中所展示的这些）。


b) 执行根目录下webui.bat文件
根目录下将生成tmp和venv目录。

c) 编辑venv目录下pyvenv.cfg文件
将include-system-site-packages = false改为include-system-site-packages = true。

d) 配置python库管理器pip
方便起见，在\venv\Scripts下打开cmd后执行如下命令：

pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/ #镜像
pip install -r requirements_versions.txt #执行此条命令前，请检查你的剩余磁盘空间
pip install xformer #如果不执行此条命令，启动Stable Diffusion时可能会出现错误。xformer还可以在后续使用中降低显卡占用。
1
2
3
xformer会安装到\venv\Lib\site-packages中，安装失败可以用pip install -U xformers命试试。

e) 安装语言包
将文件chinese-all-0306.json 和 chinese-english-0306.json放到目录\localizations目录中。
运行webui后进行配置，操作方法见下。

f) 安装扩展（可选）
将sd-webui-controlnet解压缩到\extensions目录中。
将control_sd15_openpose.pth文件复制到/extensions/sd-webui-controlnet/models目录中。
不同的扩展可能还需要安装对应的系统，比如controlnet要正常使用则还需要安装ffmpeg等。

g) 安装模型
下载的各种模型放在\models\Stable-diffusion目录中即可。

h) 再次执行根目录下webui.bat文件
用浏览器打开webui.bat所提供的网址即可运行。

其中提供了网址：http://127.0.0.1:7860。

打开该网址后在Settings -> User interface -> Localization (requires restart)设置语言，在菜单中选择chinese-all-0220（前提是已经在目录中放入了对应语言包，见上），点击Apply Settings确定，并且点击Reload UI重启界面后即可。

好了，现在可以开始使用了~~

三、问题及注意点
1. python版本错误
错误：
ERROR: Could not find a version that satisfies the requirement torch==1.13.1+cu117
ERROR: No matching distribution found for torch==1.13.1+cu117

这是由于python版本不对导致的（上面提过了，截止发稿时不能追求新版本），要用python 3.10.*版本。
解决来源：https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/7166


2. pip版本错误
警告：
[notice] A new release of pip available: 22.3.1 -> 23.0.1
[notice] To update, run: D:\stable-diffusion-webui\venv\Scripts\python.exe -m pip install --upgrade pip

提示中已经给出了解决方案：
在\venv\Scripts\目录中打开cmd，执行

python.exe -m pip install --upgrade pip
1
3. 安装或执行停滞
如果在执行webui.bat进行包下载安装时或者生成图片时会卡很久都没反应，那么这时可以复制包名，进入python安装目录或\venv\Scripts\目录中打开cmd，执行

pip install 包名
1
也可以通过任务管理查看网络状态，如果网络在玩命下载，那么就等着吧~~


4. xFormers安装不上
很多同学都反应xformers无法安装，可以用以下的方法试试：

检查Dreambooth要求的Python版本：
如果您的Python版本低于3.6，请安装最新的Python版本，并重复尝试安装xformers。
# 据此可以在终端中运行以下命令，以检查您的Python版本：
python --version
1
2
安装依赖项：xformers有许多依赖项，如果这些依赖项没有正确安装可能会导致升级失败。您可以尝试安装以下依赖项：
pip install numpy scipy torch torchaudio transformers
1
清除pip缓存并重新安装：
# 清除xformers缓存：运行以下命令清除xformers缓存。
pip uninstall -y xformers
pip cache purge

# 更新pip：确保您正在使用最新版本的pip，可以运行以下命令更新pip。
pip install --upgrade pip

# 安装xformers：在清除了缓存并更新了pip之后，重新安装xformers。
pip install xformers
1
2
3
4
5
6
7
8
9
手动安装xformers指定版本
如果上述步骤仍然无法解决问题，可尝试手动安装Dreambooth所需的xformers版本。在Dreambooth的文档中，可以找到xformers的版本要求。
pip install xformers==0.0.17.dev465
1
使用conda环境
如果您使用的是conda环境，请尝试在conda环境中安装xformers。
# 创建conda环境
conda create --name myenv

# 激活conda环境并安装xformers
conda activate myenv
pip install xformers
1
2
3
4
5
6
网络问题
如果已经配置好了代理，就不要考虑这个了。
检查网络连接：请确保您的计算机与互联网连接，并且网络连接没有被防火墙或代理服务器阻止：
# 检查网络连接是否正常
ping google.com
1
2
非必要
你确定需要使用xformers么？如果不需要，可以在webui-user.bat中把--xformers去掉试试。

其它
如果上述方法还是无法解决问题，请尝试在OpenAI的论坛或者Dreambooth的GitHub页面上寻求更多帮助。-_-!

5. 其他安装问题
删除/tmp和/venv目录后重启webui.bat试试。

6. 硬件问题
一般显卡不达标，就会爆卡，解决办法就是编辑根目录下webui-user.bat文件，试一下修改参数COMMANDLINE_ARGS即可。

以下几个设置逐一测试看看哪个适合自己。

set COMMANDLINE_ARGS=--lowvram --precision full --no-half --skip-torch-cuda-test
set COMMANDLINE_ARGS=--lowvram --precision full --no-half
set COMMANDLINE_ARGS=--lowvram
1
2
3
本机显存4G，使用最后一个配置方法，可以烧出2048*1080的图，前两种方法反而会在最后爆卡。

最后，预祝各位成功~~


dog drink~~where is dog?


参考：
【AI繪畫】Stable-Diffusion 通過骨架分析插件ControlNet 來製作超有意境的圖片
Stable Diffusion2.1+WebUI的安装与使用（极详细）
低配显卡想玩Stable Diffusion？修改一个配置就行
————————————————
版权声明：本文为CSDN博主「暂时先用这个名字」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/snans/article/details/129365893
