import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Encode} from 'arraybuffer-encoding/base64/url';

@Injectable({
  providedIn: 'root'
})
export class ImageManipulationService {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  constructor(private http: HttpClient) {
    this.canvas = new HTMLCanvasElement();
    this.context = this.canvas.getContext("2d")!;
  }

  async cutImage(imageURL: string, x: number, y: number, w: number, h: number): Promise<string> {
    // Get the image
    let imageAB = await this.http.get(imageURL, {
      responseType: 'arraybuffer'
    }).toPromise();
    let imageOut = Encode(imageAB);
    console.log(imageOut);

    // Cut the image
    return await new Promise(resolve => {
      let image = new Image();
      image.onload = () => {
        this.canvas.width = w;
        this.canvas.height = h;
        this.context.clearRect(0, 0, w, h);
        this.context.drawImage(image, x, y, w, h, 0, 0, w, h);
        resolve(this.canvas.toDataURL());
      }
      image.src = imageOut;
    });
  }
}
