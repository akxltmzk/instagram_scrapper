using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

public class Image : MonoBehaviour
{
    public string myPath = "C:\\Users\\dohyunoo\\Desktop\\scrapping_image\\";
    public Transform rayCastedPosition;

    private bool isImport_instagram_image = false;
    private Texture texture_idle;
    private Renderer renderer;

    private Vector3 startPosition;
    private Vector3 startScale;
    private Quaternion startRotation;


    private void Start()
    {
        this.transform.parent.gameObject.transform.parent = GameObject.FindWithTag("Image_Container").transform;
        renderer = GetComponent<Renderer>();
        texture_idle = renderer.material.mainTexture;
    }


    public void Update()
    {
        if (AppManager.Instance.instagram_image_ready && !isImport_instagram_image)
        {
            isImport_instagram_image = true;
            StartCoroutine(Load_image());
            SetStartTransform();
        }
        else if (!AppManager.Instance.instagram_image_ready) {
            if (!isImport_instagram_image)
                return;

            // reset
            isImport_instagram_image = false;
            renderer.material.mainTexture = texture_idle;
            BacktoStartPosition();
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

    private void SetStartTransform() {
        startPosition = transform.localPosition;
        startRotation = transform.localRotation;
        startScale = transform.localScale;
    }

    public void RaycstedFromCamera() {
        transform.position = rayCastedPosition.position;
        transform.rotation = rayCastedPosition.rotation;
        transform.localScale = new Vector3(1.5f, 1.5f, 1.5f);

    }

    public void BacktoStartPosition()
    {
        transform.localScale = startScale;
        transform.localPosition = startPosition;
        transform.localRotation = startRotation;
    }

}
