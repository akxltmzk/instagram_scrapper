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
        socket.On("vr-account-enter", Account_Enter);
        socket.On("vr-account_enter_fail", Account_Enter_Fail);
        socket.On("vr-image-ready-signal", Instagram_Image_Ready);
        socket.On("vr-finish-signal", SceneReset);
   
    }

    public void Account_Enter(SocketIOEvent e) {
        UIManager.Instance.UIObject_Array[0].SetActive(false);
        UIManager.Instance.UIObject_Array[1].SetActive(true);
    }

    public void Account_Enter_Fail(SocketIOEvent e)
    {
        UIManager.Instance.UIObject_Array[1].SetActive(false);
        UIManager.Instance.UIObject_Array[0].SetActive(true);
    }

    public void Instagram_Image_Ready(SocketIOEvent e)
    {
        UIManager.Instance.UIObject_Array[1].SetActive(false);
        UIManager.Instance.UIObject_Array[2].SetActive(true);
        UIManager.Instance.start_target.SetActive(true);
    }

    public void SceneReset(SocketIOEvent e) {
   
        UIManager.Instance.UICanvas.SetActive(true);
        UIManager.Instance.UIObject_Array[0].SetActive(true);

        UIManager.Instance.UIObject_Array[1].SetActive(false);
        UIManager.Instance.UIObject_Array[2].SetActive(false);
        UIManager.Instance.start_target.SetActive(false);
    }

    public void UserReady() {
        socket.Emit("user-ready");
    }
}
