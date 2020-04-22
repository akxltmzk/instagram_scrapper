using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

public class InitScene : Singleton<InitScene>
{

    #region Variables

    [Header("Scene Transition")]
    public bool experience_on;
    public Animator scenes_animator;

    [Header("Gallery")]
    public GameObject container;
    [HideInInspector]
    public List<Texture2D> instagram_pics = new List<Texture2D>();
    [HideInInspector]
    public List<Material> mat;

    [Header("Scripts")]
    public SoundManager soundManager;

    public string imageFolderPath = "C:\\Users\\dohyunoo\\Desktop\\scrapping_image";

    #endregion


    #region Standard Functions

    void Start()
    {
        // hide all pics
        foreach (Transform item in container.transform)
        {
            item.gameObject.SetActive(false);
        }

    }

    private void Update()
    {
        if (Input.GetKeyUp("space"))
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
        yield return new WaitForSeconds(2f);

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
            Material material = new Material(Shader.Find("Standard"));
            material.SetTexture("_MainTex", texture);
            material.SetFloat("_Glossiness", 1f);
            material.SetFloat("_SpecularHighlights", 0f);
            mat.Add(material);
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
        //mat.Clear();
        //instagram_pics.Clear();
    }

    #endregion

}