using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using SocketIO;

public class SocketManager : Singleton<SocketManager>
{
    public SocketIOComponent socket;

    public void Start()
    {
        socket.On("vr-start-signal", Start_Instagram_World);
        socket.On("vr-finish-signal", SceneReset);
    }

    public void Start_Instagram_World(SocketIOEvent e)
    {
        AppManager.Instance.Start_Instagram_World();
    }

    public void SceneReset(SocketIOEvent e) {
        AppManager.Instance.instagram_image_ready = false;
    }
}
