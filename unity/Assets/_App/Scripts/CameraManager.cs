using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraManager : Singleton<CameraManager>
{
    #region "Varable"


    public float timer;

    private RaycastHit hitInfo;

    #endregion

    void Update()
    {
        RayCastFromCameraCenter();
    }

    public void Camera_Reset()
    {
        GetComponent<Camera>().backgroundColor = Color.black;
        timer = 0;
    }

    private void RayCastFromCameraCenter()
    {

        if (Physics.Raycast(Camera.main.transform.position, Camera.main.transform.forward, out hitInfo, 100f))
        {
            GameObject objectHit = hitInfo.transform.gameObject;
            if (objectHit.tag == "Start_Target")
                UIManager.Instance.gazing_up();
        }
        else {
            UIManager.Instance.gazing_down();
        }
    }

}
