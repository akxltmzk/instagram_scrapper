using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class AppManager : Singleton<AppManager>
{

    public Camera mainCamera;
    public List<GameObject> image_array = new List<GameObject>();
    public GameObject images_box_prefab;
    private int copy_Count = 50;
    private int instantiage_gap = 11;



    [SerializeField]
    public bool startExperience = false;

    void Start()
    {
        for (int i = 0; i < copy_Count; i++) {
            GameObject prefab = Instantiate(images_box_prefab);
            prefab.transform.position = new Vector3(0, -i * instantiage_gap, 0);

        }

    }

    
    // start with socket signal
    public void Start_Instagram_World()
    {
        startExperience = true;
    }

    public void FindAllImagePlane() {
        GameObject[] first_images_box_image = GameObject.FindGameObjectsWithTag("Image");
        foreach (GameObject i in first_images_box_image)      
            image_array.Add(i);
    }
}
