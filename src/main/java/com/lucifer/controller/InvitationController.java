package com.lucifer.controller;

import com.lucifer.mapper.InvitationMapper;
import com.lucifer.model.Invitation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InvitationController {

    @Autowired
    InvitationMapper invitationMapper;

    @RequestMapping(value = "/invitation/save")
    public Invitation save(Invitation invitation){
        invitationMapper.save(invitation);
        return invitation;
    }
}
