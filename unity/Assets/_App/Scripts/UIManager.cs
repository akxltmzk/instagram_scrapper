using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIManager : Singleton<UIManager>
{

    public GameObject UICanvas;
    public Transform UIPosition_leader;
    public GameObject[] UIObject_Array;
    public GameObject start_target;
    public Text start_target_txt;

    private float gazing_timer = 4.0f;

    private void Update()
    {
       UICanvas_Position_Set();
    }

    public void gazing_up() {       
        gazing_timer -= Time.deltaTime;
        int time = (int)(gazing_timer % 60);
        start_target_txt.text = time.ToString();

        if (gazing_timer < 0)
        {        
            UICanvas.SetActive(false);
            start_target.SetActive(false);
            gazing_timer = 4.0f;
            SocketManager.Instance.UserReady();
        }
    }

    public void gazing_down() {
        start_target_txt.text = "START";
        gazing_timer = 4.0f;
    }

    private void UICanvas_Position_Set() {
        UICanvas.transform.position = Vector3.Lerp(UICanvas.transform.position, UIPosition_leader.position, Time.deltaTime * 2);
        UICanvas.transform.rotation = Quaternion.Lerp(UICanvas.transform.rotation, UIPosition_leader.rotation, Time.deltaTime);
    }


}
