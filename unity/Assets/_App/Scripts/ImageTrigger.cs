using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ImageTrigger : MonoBehaviour
{

    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.tag == "Image" && AppManager.Instance.isExperienceStart)
            other.gameObject.transform.GetChild(0).gameObject.SetActive(false);
    }
}
