import { app } from "electron";
import appLifecycle from "./config/appLifecycle.js";

// Performans optimizasyonları
app.commandLine.appendSwitch("disable-http-cache");
app.commandLine.appendSwitch("enable-gpu");
app.commandLine.appendSwitch("enable-gpu-compositing");
app.commandLine.appendSwitch("enable-gpu-driver-compositing");
app.commandLine.appendSwitch("enable-gpu-driver-compositing");
app.commandLine.appendSwitch("enable-hardware-acceleration");
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("enable-gpu-rasterization");
app.commandLine.appendSwitch("enable-zero-copy");
app.commandLine.appendSwitch("enable-native-gpu-memory-buffers");
app.commandLine.appendSwitch("js-flags", "--max-old-space-size=4096");
app.commandLine.appendSwitch("enable-gpu-memory-buffer-video-frames");
app.commandLine.appendSwitch("enable-features", "VaapiVideoDecoder");
app.commandLine.appendSwitch("enable-webgl");
app.commandLine.appendSwitch("enable-accelerated-2d-canvas");

appLifecycle();
