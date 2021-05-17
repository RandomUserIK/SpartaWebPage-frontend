import {Component, OnInit} from '@angular/core';
import {InstagramSearchService} from '../../services/instagram-search.service';
import {Gallery} from 'angular-gallery';

@Component({
  selector: 'app-home-instagram-gallery',
  templateUrl: './home-instagram-gallery.component.html',
  styleUrls: ['./home-instagram-gallery.component.scss']
})
export class HomeInstagramGalleryComponent implements OnInit {

  public posts: Array<{ path: string }> = [];
  public loading = true;


  constructor(private instagramSearchService: InstagramSearchService,
              private gallery: Gallery) {
  }

  ngOnInit(): void {
    this.instagramSearchService.search().subscribe(
      (results) => {
        this.loading = false;
        results.data.forEach((post) => {
          if (this.posts.length < 6 && !post.media_url.includes('video'))
            this.posts.push({path: post.media_url});
        });
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  showGallery(index: number) {
    const prop = {
      images: this.posts,
      index
    };
    this.gallery.load(prop);
  }
}
