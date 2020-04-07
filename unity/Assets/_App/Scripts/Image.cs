using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

public class Image : MonoBehaviour
{
    public string myPath = "C:\\Users\\dohyunoo\\Desktop\\scrapping_image\\";
    private bool startExperience = false;


    private void Start()
    {
        this.transform.parent = GameObject.FindWithTag("Image_Container").transform;
 
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

        }

    }

    private IEnumerator Load_image()
    {
        yield return new WaitForSeconds(2f);

        string[] filePaths = Directory.GetFiles(myPath, "*.jpg");
        Renderer render = GetComponent<Renderer>();
        StartCoroutine(Setting_image(render, filePaths[Random.Range(0,filePaths.Length)]));

        yield return null;
        
    }

    private IEnumerator Setting_image(Renderer _renderer, string _path)
    {
        WWW www = new WWW("file://" + _path);

        yield return www;

        Texture2D new_texture = new Texture2D(512, 512);
        www.LoadImageIntoTexture(new_texture);
        _renderer.material.mainTexture = new_texture;
    }

}
