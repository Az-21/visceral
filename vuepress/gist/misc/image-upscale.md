# Setup

## Software

```ps
winget install Anaconda.Anaconda3
```

## Clone Real-ESRGAN

```ps
git clone https://github.com/xinntao/Real-ESRGAN.git .
```

## Pretrained Model

https://github.com/xinntao/Real-ESRGAN/blob/master/docs/anime_video_model.md

Download `RealESRGANv2-animevideo-xsx4.pth` and place it in `.\experiments\pretrained_models\`

---

## Virtual Enviornment

Create a virtual environment named `artemis` using Anaconda

Add conda-forge channel
```ps
conda config --add channels conda-forge
conda config --set channel_priority strict
```

### Run following sections' code using Anaconda Command Prompt**

**Ensure you are in `(artemis)` virual environment before proceeding.**

## Python Dependandicies

```ps
conda install pytorch torchvision torchaudio cudatoolkit=11.3 -c pytorch
pip install basicsr
pip install facexlib
pip install gfpgan
pip install -r requirements.txt
```

## Finalize setup

**Ensure you have installed all dependancies**

```ps
python setup.py develop
```

## Run a test

```ps
python inference_realesrgan_video.py -i inputs/video/video.mp4 -n RealESRGANv2-animevideo-xsx2 -s 2 -v -a
```

## Corrupted PyTorch (Optional)

Perform this section only if running a test throws 'Torch not compiled with CUDA'
https://github.com/pytorch/pytorch/issues/30664#issuecomment-757431613

```ps
pip uninstall torch
pip cache purge
pip install torch -f https://download.pytorch.org/whl/torch_stable.html
python setup.py develop
```