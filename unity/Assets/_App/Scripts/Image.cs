using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

public class Image : MonoBehaviour
{
    public string myPath = "C:\\Users\\dohyunoo\\Desktop\\scrapping_image\\";
    private bool startExperience = false;
    private Texture texture_idle;
    private Renderer renderer;

    private void Start()
    {
        this.transform.parent = GameObject.FindWithTag("Image_Container").transform;
        renderer = GetComponent<Renderer>();
        texture_idle = renderer.material.mainTexture;
    }


    public void Update()
    {
        if (AppManager.Instance.startExperience && !startExperience)
        {
            startExperience = true;
            StartCoroutine(Load_image());
        }
        else if (!AppManager.Instance.startExperience) {
            if (!startExperience)
                return;

            startExperience = false;
            renderer.material.mainTexture = texture_idle;
        }

    }

    private IEnumerator Load_image()
    {
        yield return new WaitForSeconds(2f);

        string[] filePaths = Directory.GetFiles(myPath, "*.jpg");
       
        StartCoroutine(Setting_image(filePaths[Random.Range(0,filePaths.Length)]));

        yield return null;
        
    }

    private IEnumerator Setting_image(string _path)
    {
        WWW www = new WWW("file://" + _path);

        yield return www;

        Texture2D new_texture = new Texture2D(512, 512);
        www.LoadImageIntoTexture(new_texture);
        renderer.material.mainTexture = new_texture;
    }

}
