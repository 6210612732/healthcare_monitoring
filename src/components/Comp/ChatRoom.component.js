import React from 'react'
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

const ChatRoom = () => {
    return (
            <div>
              <section >
                <div class="container py-5 px-auto">

                  <div class="row">

                    <div class="">

                      <ul class="list-unstyled">
                        <li class="d-flex justify-content-between mb-4">
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                            class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60"/>
                          <div class="card">
                            <div class="card-header d-flex justify-content-between p-3">
                              <p class="fw-bold mb-0">Brad Pitt</p>
                              <p class="text-muted small mb-0"><i class="far fa-clock"></i> 12 mins ago</p>
                            </div>
                            <div class="card-body">
                              <p class="mb-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua.
                              </p>
                            </div>
                          </div>
                        </li>
                        <li class="d-flex justify-content-between mb-4">
                          <div class="card w-100">
                            <div class="card-header d-flex justify-content-between p-3">
                              <p class="fw-bold mb-0">Lara Croft</p>
                              <p class="text-muted small mb-0"><i class="far fa-clock"></i> 13 mins ago</p>
                            </div>
                            <div class="card-body">
                              <p class="mb-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                laudantium.
                              </p>
                            </div>
                          </div>
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
                            class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60"/>
                        </li>
        
                        
                        
                        <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">            
                          <textarea class="form-control" id="textAreaExample2" rows="2"></textarea>
                          <Button className='py-4 px-3  mx-2 'variant="dark" >send</Button>
                        </div>


                      </ul>

                    </div>

                  </div>

                </div>
              </section>
            </div>
         )
}

export default ChatRoom