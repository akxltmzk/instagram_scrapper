using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraManager : Singleton<CameraManager>
{
    #region Variable
    private RaycastHit hitInfo;
    private float raycast_distance;
    #endregion

    #region Standard Function

    private void Start()
    {
        raycast_distance = AppManager.Instance.raycast_distance;
    }

    void Update()
    {
        RayCastFromCameraCenter();
    }

    #endregion

    #region Camera RayCast

    private void RayCastFromCameraCenter()
    {

        if (Physics.Raycast(Camera.main.transform.position, Camera.main.transform.forward, out hitInfo, raycast_distance))
        {
            GameObject objectHit = hitInfo.transform.gameObject;
            if (objectHit.tag == "Start_Target")
                UIManager.Instance.gazing_up();
        }
        else {
            UIManager.Instance.gazing_down();
        }
    }

    #endregion
}
