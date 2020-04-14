using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class AppManager : Singleton<AppManager>
{
    #region "Varable"

    [Header("Other GameObject")]
    public GameObject images_box_prefab;
    public GameObject image_container;
    public GameObject image_trigger;

    [Header("Image_grid")]
    public int copy_Count;
    public int instantiage_gap;

    [HideInInspector]
    public bool instagram_image_ready = false;
    [HideInInspector]
    public bool isExperienceStart = false;
    [HideInInspector]
    public List<GameObject> image_array = new List<GameObject>();

    // private
    private Vector3 image_container_Start_Position;
    private Vector3 image_trigger_Start_Position;

    #endregion


    void Start()
    {
        image_container_Start_Position = image_container.transform.position;
        image_trigger_Start_Position = image_trigger.transform.position;
        Instantiate_Image_Grid();
        UIManager.Instance.UICanvas.SetActive(false);
    }

    private void Update()
    {
        MoveContainer();
    }

    private void Instantiate_Image_Grid()
    {
        for (int i = 0; i < copy_Count; i++)
        {
            GameObject prefab = Instantiate(images_box_prefab);
            prefab.transform.position = new Vector3(0, 0, i * instantiage_gap);
        }
    }

    private void MoveContainer() {
        if (isExperienceStart)
        {
            image_container.transform.position += Vector3.back * Time.deltaTime;
            image_trigger.transform.position += Vector3.forward * Time.deltaTime;
        }
    }

    // start with socket signal
    public void Import_Instagram_Image()
    {
        instagram_image_ready = true;
        UIManager.Instance.UICanvas.SetActive(true);
    }

    public void SetActiveImageTriggerCollider() {
        image_trigger.GetComponent<Collider>().enabled = true;
    }

    public void ResetApp() {
        image_trigger.GetComponent<Collider>().enabled = false;
        instagram_image_ready = false;
        isExperienceStart = false;
        image_container.transform.position = image_container_Start_Position;
        image_trigger.transform.position = image_trigger_Start_Position;
        CameraManager.Instance.timer = 0;
    }
}
