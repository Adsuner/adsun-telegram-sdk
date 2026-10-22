// Unity WebGL plugin: put in Assets/Plugins/WebGL/. C#:
//   [DllImport("__Internal")] static extern void AdsunShow(string blockId, string gameObject);
//   void OnAdsunReward(string blockId) {}  void OnAdsunError(string json) {}
mergeInto(LibraryManager.library, {
  AdsunShow: function (blockIdPtr, objPtr) {
    var blockId = UTF8ToString(blockIdPtr), obj = UTF8ToString(objPtr);
    if (!window.Adsun) { SendMessage(obj, "OnAdsunError", JSON.stringify({ error: true, done: false, state: "load", description: "Adsun script not loaded" })); return; }
    window.Adsun.init({ blockId: blockId }).show()
      .then(function () { SendMessage(obj, "OnAdsunReward", blockId); })
      .catch(function (r) { SendMessage(obj, "OnAdsunError", JSON.stringify(r)); });
  },
});
