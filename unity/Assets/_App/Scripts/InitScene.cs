using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using Valve.VR;


public class InitScene : Singleton<InitScene>
{

    #region Variables

    [Header("Scene Transition")]
    public bool experience_on;
    public Animator scenes_animator;
    public Animator cam_animator;

    [Header("Gallery")]
    public Material originalMat;
    public GameObject container;

    [Header("Scripts")]
    public SoundManager soundManager;

    [Header("Debug Image")]
    public List<Texture2D> debug_pics = new List<Texture2D>();

    [HideInInspector]
    public List<Texture2D> instagram_pics = new List<Texture2D>();
    [HideInInspector]
    public List<Material> mat;
    [HideInInspector]
    public string imageFolderPath;

    private bool isDebug;

    #endregion

    #region Standard Functions

    void Start()
    {
        imageFolderPath = AppManager.Instance.imageFolderPath;
        isDebug = AppManager.Instance.isDebug;
        
        if(isDebug)
            StartCoroutine(InitGallery());

        // hide all pics
        foreach (Transform item in container.transform)
        {
            item.gameObject.SetActive(false);
        }

    }

    private void Update()
    {
        if (Input.GetKeyUp("space") && isDebug)
        {
            experience_on = !experience_on;
            ManageExperience();
        }
    }

    #endregion

    #region Transitions

    public void ManageExperience()
    {
        if (experience_on)
        {
            // sound
            soundManager.bgm_gallery.Stop();
            soundManager.bgm_gallery.Play();
            soundManager.transition_anim.SetTrigger("GoToExperience");
            soundManager.bgm_transition_in.Play();

            // cam transition
            cam_animator.SetTrigger("cam_transition");

            // show images tunnel
            foreach (Transform item in container.transform)
                StartCoroutine(ManagePost(item.gameObject, true, Random.Range(0.9f, 1.9f)));
            // play animation
            scenes_animator.SetTrigger("GoToExperience");
        }
        else
        {
            // sound
            soundManager.bgm_lobby.Stop();
            soundManager.bgm_lobby.Play();
            soundManager.transition_anim.SetTrigger("GoToLobby");
            soundManager.bgm_transition_out.Play();

            // cam transition
            cam_animator.SetTrigger("cam_transition");

            // play animation
            scenes_animator.SetTrigger("GoToLobby");
            // hide gallery images
            foreach (Transform item in container.transform)
                StartCoroutine(ManagePost(item.gameObject, false, Random.Range(0.2f, 1f)));
            // clear data
            Invoke("ClearGallery", 1f);
        }
    }

    public IEnumerator ManagePost(GameObject pic, bool state, float wait)
    {
        yield return new WaitForSeconds(wait);
        pic.SetActive(state);
    }

    #endregion

    #region Gallery

    public IEnumerator InitGallery()
    {
        

        yield return new WaitForSeconds(1f);

        if (!isDebug)
        {
            ClearGallery();
            string[] filePaths = Directory.GetFiles(imageFolderPath, "*.jpg");

            foreach (string path in filePaths)
            {
                WWW www = new WWW("file://" + path);
                yield return www;
                Texture2D new_texture = new Texture2D(512, 512);
                www.LoadImageIntoTexture(new_texture);
                instagram_pics.Add(new_texture);
            }


            // Create Material list
            foreach (Texture2D texture in instagram_pics)
            {
                Material material = new Material(Shader.Find("Valve/vr_standard"));
                material.CopyPropertiesFromMaterial(originalMat);
                material.SetTexture("_MainTex", texture);
                mat.Add(material);
            }
        }
        else {

            foreach (Texture2D texture in debug_pics)
            {
                Material material = new Material(Shader.Find("Valve/vr_standard"));
                material.CopyPropertiesFromMaterial(originalMat);
                material.SetTexture("_MainTex", texture);
                mat.Add(material);
            }
        }


        // Randomly set material
        foreach (Transform item in container.transform)
        {
            item.GetComponent<MeshRenderer>().sharedMaterial = mat[Random.Range(0, mat.Count)];
        }

        yield return null;


    }

    public void ClearGallery()
    {
        instagram_pics.Clear();
        mat.Clear();
    }

    #endregion

}