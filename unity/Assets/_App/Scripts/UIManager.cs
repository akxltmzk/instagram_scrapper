using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UIManager : Singleton<UIManager>
{
    public GameObject Image_Container;
    public GameObject UICanvas;
    public GameObject initializing_bar_gazing;
    public Transform UIPosition_leader;

    private RectTransform initializing_bar_size;
    private float x_increase = 0;
    

    private void Start()
    {
        initializing_bar_size= initializing_bar_gazing.GetComponent<RectTransform>();
   
    }

    private void Update()
    {
        initializing_bar_size.localScale = new Vector3(x_increase, 0.1f, 0.1f);

        if (AppManager.Instance.instagram_image_ready)
            UICanvas_Position_Set();       
    }

    public void gazing_up() {
        
        x_increase += Time.deltaTime * 0.2f;

        // experience start
        if (x_increase > 1)
        {
            UICanvas.SetActive(false);

            Image_Container.SetActive(true);
            Image_Container.transform.position = Camera.main.transform.position;
            Image_Container.transform.rotation = Quaternion.identity;
            AppManager.Instance.SetActiveImageTriggerCollider();
            AppManager.Instance.isExperienceStart = true;
        }
        
    }

    public void gazing_down() {
        x_increase -= Time.deltaTime * 0.5f;
        if (x_increase < 0)
            x_increase = 0;
    }

    private void UICanvas_Position_Set() {
        UICanvas.transform.position = Vector3.Lerp(UICanvas.transform.position, UIPosition_leader.position, Time.deltaTime * 2);
        UICanvas.transform.rotation = Quaternion.Lerp(UICanvas.transform.rotation, UIPosition_leader.rotation, Time.deltaTime *0.5f );
    }

    public void UICanvas_Reset() {
        initializing_bar_size.localScale = new Vector3(0, 0.1f, 0.1f);
        UICanvas.SetActive(false);
    }

}
