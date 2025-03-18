import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationMaskComponent } from './segmentation-mask.component';

describe('SegmentationMaskComponent', () => {
  let component: SegmentationMaskComponent;
  let fixture: ComponentFixture<SegmentationMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentationMaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentationMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
