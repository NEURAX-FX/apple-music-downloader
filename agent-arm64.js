'use strict';

const fairplayCert = "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";
const kdContextMap = new Map();
let persistentKeyPtr = null;
const prefetchKey = "skd://itunes.apple.com/P000000000/s1/e1";
let preshareCtx = null;

function newStdStringFromArrayBuffer(content) {
    return newStdString(String.fromCharCode(...new Uint8Array(content)));
}

function newStdString(content) {
    const size = content.length;
    if (size >= 0x17) {
        const capacity = 2 ** Math.ceil(Math.log2(size + 1));
        const buffer = malloc(capacity);
        buffer.writeUtf8String(content);

        const str = malloc(Process.pointerSize * 3);
        str.writeULong(capacity | 0x1);
        str.add(Process.pointerSize).writeULong(size);
        str.add(Process.pointerSize * 2).writePointer(buffer);

        return { buffer, str };
    } else {
        const str = malloc(size + 2);
        str.writeU8(size * 2);
        str.add(1).writeUtf8String(content);
        str.add(size + 1).writeU8(0);

        return { buffer: null, str };
    }
}

function getStrFromStdString(content) {
    const mem = new NativePointer(content);
    const size = mem.readU8();
    if ((size & 0x1) === 1) {
        const bufferSize = mem.add(Process.pointerSize).readULong();
        const bufferPtr = mem.add(Process.pointerSize * 2).readPointer();
        return bufferPtr.readUtf8String(bufferSize);
    } else {
        return mem.add(1).readUtf8String(size / 2);
    }
}

function getPersistentKeyASM(
    sessionCtrlInstance,
    adamIdStr, keyUriStr,
    keyFormatStr, keyFormatVerStr,
    serverUriStr, protocolTypeStr,
    fpsCertStr, persistentKeyPtr
) {
    const impl = malloc(Process.pageSize);
    Memory.patchCode(impl, Process.pageSize, code => {
        const writer = new Arm64Writer(code, { pc: impl });
        writer.putLdrRegAddress("x0", sessionCtrlInstance);
        writer.putLdrRegAddress("x1", adamIdStr.str);
        writer.putLdrRegAddress("x2", adamIdStr.str);
        writer.putLdrRegAddress("x3", keyUriStr.str);
        writer.putLdrRegAddress("x4", keyFormatStr.str);
        writer.putLdrRegAddress("x5", keyFormatVerStr.str);
        writer.putLdrRegAddress("x6", serverUriStr.str);
        writer.putLdrRegAddress("x7", protocolTypeStr.str);
        writer.putLdrRegAddress("x8", persistentKeyPtr);
        writer.putSubRegRegImm("sp", "sp", 0x10);
        writer.putLdrRegAddress("x9", fpsCertStr.str);
        writer.putStrRegRegOffset("x9", "sp", 0);
        writer.putCallAddressWithArguments(getPersistentKeyAddr, ["x0", "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8"]);
        writer.putAddRegRegImm("sp", "sp", 0x10);
        writer.flush();
    });

    const implFunc = new NativeFunction(impl, 'void', []);
    try {
        implFunc();
    } catch (e) { } // Ignore errors
    dealloc(impl);
}

function decryptContextASM(sessionCtrlInstance, persistentKeyPtr, decryptedKeyPtr) {
    const impl = malloc(Process.pageSize);
    Memory.patchCode(impl, Process.pageSize, code => {
        const writer = new Arm64Writer(code, { pc: impl });
        writer.putLdrRegAddress("x0", sessionCtrlInstance);
        writer.putLdrRegAddress("x1", persistentKeyPtr);
        writer.putLdrRegAddress("x8", decryptedKeyPtr);
        writer.putCallAddressWithArguments(decryptContextAddr, ["x0", "x1", "x8"]);
        writer.flush();
    });

    const implFunc = new NativeFunction(impl, 'void', []);
    try {
        implFunc();
    } catch (e) { } // Ignore errors
    dealloc(impl);
}

function getKdContextOnce(adamId, uri) {
	const adamIdText = String.fromCharCode(...new Uint8Array(adamId));
	const uriText = String.fromCharCode(...new Uint8Array(uri));
	const isPreshare = adamIdText === "0" && uriText === prefetchKey;
	if (isPreshare && preshareCtx && !preshareCtx.isNull()) {
		console.log(`[decrypt] using cached preshare adamId=${adamIdText} ptr=${preshareCtx}`);
		return preshareCtx;
	}
	console.log(`[decrypt] negotiating kdContext adamId=${adamIdText} uri=${uriText}`);

    const adamIdStr = newStdStringFromArrayBuffer(adamId);
    const keyUriStr = newStdStringFromArrayBuffer(uri);
    const keyFormatStr = newStdString("com.apple.streamingkeydelivery");
    const keyFormatVerStr = newStdString("1");
    const serverUriStr = newStdString("https://play.itunes.apple.com/WebObjects/MZPlay.woa/music/fps");
    const protocolTypeStr = newStdString("simplified");
    const fpsCertStr = newStdString(fairplayCert);

    const persistentKeyPtr = malloc(Process.pointerSize * 2);
    getPersistentKeyASM(
        sessionCtrlInstance,
        adamIdStr,
        keyUriStr,
        keyFormatStr,
        keyFormatVerStr,
        serverUriStr,
        protocolTypeStr,
        fpsCertStr,
        persistentKeyPtr
    );

    const decryptedKeyPtr = malloc(Process.pointerSize * 2);
    decryptContextASM(
        sessionCtrlInstance,
        persistentKeyPtr.readPointer(),
        decryptedKeyPtr
    );

    const kdContext = decryptedKeyPtr.readPointer().add(0x18).readPointer();

	if (kdContext.isNull()) {
		console.error(`[decrypt] kdContext is null adamId=${adamIdText} uri=${uriText}`);
        return null;
    }

	if (isPreshare) {
		preshareCtx = kdContext;
	}
	console.log(`[decrypt] kdContext ready adamId=${adamIdText} ptr=${kdContext}`);
    return kdContext;
}

function resetDecryptContexts() {
	if (!global.resetAllContexts) {
		console.log("[decrypt] resetAllContexts unavailable");
		return;
	}
	try {
		global.resetAllContexts(sessionCtrlInstance);
		preshareCtx = null;
		console.log("[decrypt] resetAllContexts done");
	} catch (e) {
		console.error("[decrypt] resetAllContexts failed:", e);
	}
}

function ensurePreshareContext() {
	if (preshareCtx && !preshareCtx.isNull()) {
		return preshareCtx;
	}
	resetDecryptContexts();
	const ctx = getKdContextOnce(stringToByteArray("0"), stringToByteArray(prefetchKey));
	if (ctx) {
		console.log(`[decrypt] preshare ready ptr=${ctx}`);
	}
	return ctx;
}

function ensurePlaybackLease(adamIdText) {
	if (adamIdText === "0") {
		return;
	}
	Java.performNow(function () {
		try {
			Java.use("com.apple.android.music.common.MainContentActivity");
			let proxy = null;
			Java.choose("com.apple.android.music.playback.SVPlaybackLeaseManagerProxy", {
				onMatch: function (x) {
					proxy = x;
				},
				onComplete: function () {}
			});
			if (!proxy) {
				console.log(`[lease] no proxy instance for adamId=${adamIdText}`);
				return;
			}
			const HLSParam = Java.array('java.lang.String', ["HLS"]);
			const assetInfo = proxy.requestAsset(parseInt(adamIdText), null, HLSParam, false);
			console.log(`[lease] requestAsset refresh adamId=${adamIdText} ok=${assetInfo !== null}`);
		} catch (e) {
			console.log(`[lease] requestAsset refresh failed adamId=${adamIdText}: ${e}`);
		}
	});
}

function probeLeaseManagers() {
	Java.performNow(function () {
		try {
			const Proxy = Java.use("com.apple.android.music.playback.SVPlaybackLeaseManagerProxy");
			console.log(`[lease] proxy overloads=${Proxy.requestAsset.overloads.length}`);
			Java.choose("com.apple.android.music.playback.SVPlaybackLeaseManagerProxy", {
				onMatch: function (x) {
					console.log(`[lease] proxy instance=${x}`);
				},
				onComplete: function () {}
			});
		} catch (e) {
			console.log(`[lease] proxy probe failed: ${e}`);
		}

		Java.enumerateLoadedClasses({
			onMatch: function (name) {
				if (name.indexOf("SVPlaybackLeaseManager") !== -1) {
					console.log(`[lease] class=${name}`);
				}
			},
			onComplete: function () {}
		});
	});
}

function hexPreview(bufferLike, limit) {
	const bytes = new Uint8Array(bufferLike);
	const size = Math.min(bytes.length, limit);
	const out = [];
	for (let i = 0; i < size; i++) {
		out.push(bytes[i].toString(16).padStart(2, '0'));
	}
	return out.join(' ');
}

async function handleDecryptionConnection(socket) {
	let session = null;
    try {
        while (true) {
            const adamIdSize = (await socket.input.readAll(1)).unwrap().readU8();
            if (adamIdSize === 0) break;

            const adamId = await socket.input.readAll(adamIdSize);
            const uriSize = (await socket.input.readAll(1)).unwrap().readU8();
            const uri = await socket.input.readAll(uriSize);
			session = {
				adamId: String.fromCharCode(...new Uint8Array(adamId)),
				uri: String.fromCharCode(...new Uint8Array(uri)),
				samples: 0,
				bytes: 0,
				failures: 0,
				loggedSamples: 0,
			};
			ensurePlaybackLease(session.adamId);
			ensurePreshareContext();

            const kdContext = getKdContextOnce(adamId, uri);
            if (!kdContext) {
				session.failures++;
				console.error(`[decrypt] failed to get kdContext adamId=${session.adamId}`);
                break;
            }


            while (true) {
                const sizeBuffer = await socket.input.readAll(4);
                if (sizeBuffer.byteLength === 0) break;
                const size = sizeBuffer.unwrap().readU32();
                if (size === 0) break;

                const sample = await socket.input.readAll(size);
                const sampleUnwrapped = sample.unwrap();
				const before = sample.slice(0);
				const result = decryptSample(kdContext.readPointer(), 5, sampleUnwrapped, sampleUnwrapped, sample.byteLength);
				session.samples++;
				session.bytes += sample.byteLength;
				if (session.loggedSamples < 3) {
					console.log(`[decrypt] sample adamId=${session.adamId} n=${session.samples} size=${sample.byteLength} ret=${result}`);
					console.log(`[decrypt] before=${hexPreview(before, 24)}`);
					console.log(`[decrypt] after=${hexPreview(sample, 24)}`);
					session.loggedSamples++;
				}
                await socket.output.writeAll(sample);
            }
        }
    } catch (e) {
		if (session) session.failures++;
		console.error("Connection handling error:", e);
        console.error(e.stack);
    } finally {
		if (session) {
			console.log(`[decrypt] summary adamId=${session.adamId} samples=${session.samples} bytes=${session.bytes} failures=${session.failures}`);
		}
        await socket.close();
    }
}

global.getM3U8fromDownload = function(adamID) {
    var C8717f
    Java.choose("of.f", {
        onMatch: function (x) {
            C8717f = x
        },
        onComplete: function (x) {}
    });
    var response = C8717f.q(0, "", adamID, false)
    if (response.get().getError().get() == null){
        var item = response.get().getItems().get(0)
        var assets = item.get().getAssets()
        var size = assets.size()
        return assets.get(size - 1).get().getURL()
    } else {
        return response.get().getError().get().errorCode()
    }
};

const stringToByteArray = str => {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i));
    }
    return byteArray;
};

global.getM3U8 = function(adamID) {
    Java.use("com.apple.android.music.common.MainContentActivity");
    var SVPlaybackLeaseManagerProxy;
    Java.choose("com.apple.android.music.playback.SVPlaybackLeaseManagerProxy", {
        onMatch: function (x) {
            SVPlaybackLeaseManagerProxy = x
        },
        onComplete: function (x) {}
    });
    var HLSParam = Java.array('java.lang.String', ["HLS"])
    var MediaAssetInfo = SVPlaybackLeaseManagerProxy.requestAsset(parseInt(adamID), null, HLSParam, false)
    if (MediaAssetInfo === null) {
        return -1
    }
    return MediaAssetInfo.getDownloadUrl()
};

function performJavaOperations(adamID) {
    return new Promise((resolve) => {
        Java.performNow(function () {
            let url = "";

            try {
                // 首选：Streaming 路径 为啥能跑别问我，我不知道
                url = getM3U8(adamID);
            } catch (e) {
                console.error("getM3U8 exception:", e);
                url = "";
            }

            // 如果 streaming 成功，直接返回
            if (url && url !== -1) {
                resolve(url);
                return;
            }

            // 不再尝试 of.f fallback
            console.error("Streaming M3U8 failed, skipping download fallback (Android 15)");

            // 随便回点东西
            resolve("");
        });
    });
}

async function handleM3U8Connection(s) {
    console.log("New M3U8 connection!");
    try {
        const adamSizeBuf = await s.input.readAll(1);
        if (adamSizeBuf.byteLength === 0) return;

        const adamSize = adamSizeBuf.unwrap().readU8();
        if (adamSize === 0) return;

        const adam = await s.input.readAll(adamSize);
        const byteArray = new Uint8Array(adam);
        let adamID = "";
        for (let i = 0; i < byteArray.length; i++) {
            adamID += String.fromCharCode(byteArray[i]);
        }

        console.log("adamID:", adamID);

        // 等待 promise 完成
        const m3u8Url = await performJavaOperations(adamID);

        console.log("M3U8 URL:", m3u8Url);

        const m3u8Array = stringToByteArray((m3u8Url || "") + "\n");
        await s.output.writeAll(m3u8Array);

    } catch (err) {
        console.error("Error handling M3U8 connection:", err);
    } finally {
        // 写完再关,要不然会cosplay晴天娃娃
        await s.close();
    }
}

function initializeFridaFunctions(androidappmusic) {
    // Utility functions
    global.malloc = new NativeFunction(
        Module.findExportByName(null, "_Znwm"),
        'pointer',
        ['ulong']
    );
    global.dealloc = new NativeFunction(
        Module.findExportByName(null, "_ZdlPv"),
        'void',
        ['pointer']
    );

    // Apple Music specific functions
    global.sessionCtrlInstance = new NativeFunction(
        androidappmusic.getExportByName("_ZN21SVFootHillSessionCtrl8instanceEv"),
        'pointer',
        []
    )();


    global.getPersistentKeyAddr = androidappmusic.getExportByName("_ZN21SVFootHillSessionCtrl16getPersistentKeyERKNSt6__ndk112basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_S8_S8_S8_S8_S8_S8_");
    global.decryptContextAddr = androidappmusic.getExportByName("_ZN21SVFootHillSessionCtrl14decryptContextERKNSt6__ndk112basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEERKN11SVDecryptor15SVDecryptorTypeERKb");
    global.resetAllContexts = new NativeFunction(
        androidappmusic.getExportByName("_ZN21SVFootHillSessionCtrl16resetAllContextsEv"),
        'void',
        ['pointer']
    );

    global.decryptSample = new NativeFunction(
        androidappmusic.getExportByName("NfcRKVnxuKZy04KWbdFu71Ou"),
        'ulong',
        ['pointer', 'uint', 'pointer', 'pointer', 'size_t']
    );
}

function startListeners() {
    Socket.listen({ family: "ipv4", port: 20020 })
        .then(async (listener) => {
            while (true) {
                await handleM3U8Connection(await listener.accept());
            }
        })
        .catch(console.error);

    Socket.listen({ family: "ipv4", port: 10020 })
        .then(async (listener) => {
            while (true) {
                await handleDecryptionConnection(await listener.accept());
            }
        })
        .catch(console.error);
}

function waitForModule() {
    const moduleName = "libandroidappmusic.so";
    try {
        const androidappmusic = Process.getModuleByName(moduleName);
        initializeFridaFunctions(androidappmusic);
        ensurePreshareContext();
        probeLeaseManagers();
        startListeners();
        console.log(`Module ${moduleName} loaded successfully and listeners started`);
    } catch (e) {
        console.log(`Module ${moduleName} not loaded yet, waiting...`);
        setTimeout(waitForModule, 1000);
    }
}

waitForModule();
