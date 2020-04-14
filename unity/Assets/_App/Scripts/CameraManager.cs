using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraManager : Singleton<CameraManager>
{
    Ray RayOrigin;
    RaycastHit HitInfo;
    public Color[] camera_solid_color;
    private float timer;
    private int timer_change_gap = 3;
    private int timer_change_count = 0;

    private GameObject currentRayObject;
    private GameObject previousRayObject;

    void Update()
    {
        RayCastFromCameraCenter();
        Camera_background_color_change();
    }

    private void RayCastFromCameraCenter() {

        RayOrigin = Camera.main.ViewportPointToRay(new Vector3(0, 0, 0));

        if (Physics.Raycast(Camera.main.transform.position, Camera.main.transform.forward, out HitInfo, 30.0f))
        {
            GameObject objectHit = HitInfo.transform.gameObject;

            if (objectHit.tag == "Ready_bar")
            {
                UIManager.Instance.gazing_up();
            }

            else if (objectHit.tag == "Image" && AppManager.Instance.isExperienceStart)
            {
                currentRayObject = objectHit;

                if(previousRayObject != null)
                    previousRayObject.GetComponent<Image>().BacktoStartPosition();

                currentRayObject.GetComponent<Image>().RaycstedFromCamera();

                previousRayObject =currentRayObject;
            }
        }
        else {
            UIManager.Instance.gazing_down();
        }
    }

    private void Camera_background_color_change() {
        if (AppManager.Instance.isExperienceStart)
        {
            timer += Time.deltaTime;
            if (timer > timer_change_count * timer_change_gap)
            {
                if (timer_change_count == camera_solid_color.Length)
                {
                    timer_change_count = 0;
                    timer = 0;
                }

                GetComponent<Camera>().backgroundColor = camera_solid_color[timer_change_count];
                timer_change_count++;
            }
        }
    }
}
