using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AppManager : Singleton<AppManager>
{
    [Header("Debug Mode")]
    public bool isDebug = false;

    [Header("Init Property")]
    public string imageFolderPath = "C:\\Users\\dohyunoo\\Desktop\\scrapping_image";

    [Header("Gazing Property")]
    public float gazing_time = 4.0f;
    public float raycast_distance = 100f;
    
}
