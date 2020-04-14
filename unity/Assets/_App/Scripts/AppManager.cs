using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class AppManager : Singleton<AppManager>
{   
    [Header("Other GameObject")]
    public GameObject images_box_prefab;
    public GameObject Image_Container;
    public GameObject imsgeTrigger;

    [Header("Image_grid")]
    public int copy_Count;
    public int instantiage_gap;

    [HideInInspector]
    public bool instagram_image_ready = false;
    [HideInInspector]
    public bool isExperienceStart = false;
    [HideInInspector]
    public List<GameObject> image_array = new List<GameObject>();

    void Start()
    {     
       Instantiate_Image_Grid();  
    }

    private void Update()
    {
        if (isExperienceStart)
        {
            Image_Container.transform.position += Vector3.back * Time.deltaTime;
            imsgeTrigger.transform.position += Vector3.forward * Time.deltaTime;
        }
    }


    // start with socket signal
    public void Start_Instagram_World()
    {
        instagram_image_ready = true;
        UIManager.Instance.UICanvas.SetActive(true);
    }

    public void FindAllImagePlane() {
        GameObject[] first_images_box_image = GameObject.FindGameObjectsWithTag("Image");
        foreach (GameObject i in first_images_box_image)      
            image_array.Add(i);
    }

    private void Instantiate_Image_Grid() {
        for (int i = 0; i < copy_Count; i++)
        {
            GameObject prefab = Instantiate(images_box_prefab);
            prefab.transform.position = new Vector3(0, 0, i * instantiage_gap);
        }
    }

    public void SetActiveImageTriggerCollider() {
        imsgeTrigger.GetComponent<Collider>().enabled = true;
    }
}
